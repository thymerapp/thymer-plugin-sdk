/**
 * (See the plugin-sdk's README.md for how to install and test these examples.)
 *
 * Example global plugin that shows the word count and line count of the currently active
 * panel's record in the status bar. Only applies when the active panel has a
 * record open (e.g. a document); otherwise the status item is hidden or shows "—".
 *
 * Demonstrates:
 *
 * 1. Panel awareness: onLoad we read the current active panel; we subscribe to
 *    panel.navigated and panel.focused to react when the user switches panels.
 *    We only care about the panel that has a record (document) open.
 * 
 * 2. Only doing incremental work as part of deltas in reaction to an event. When 
 *    not possible or convenient, only then do a full recalculation of the state.
 *
 * 3. Ignoring other records: we only process line-item events when
 *    ev.recordGuid === activeRecordGuid. Events for other records are ignored.
 */

/** @param {PluginLineItemSegment[]} segments */
function countWordsFromSegments(segments) {
	if (!segments || !segments.length) return 0;
	let n = 0;
	for (const seg of segments) {
		const t = typeof seg.text === 'string' ? seg.text : '';
		n += t.trim().split(/\s+/).filter(Boolean).length;
	}
	return n;
}

/** @param {PluginLineItem} lineItem */
function wordsAndLinesForOneItem(lineItem) {
	// We don't count line refs towards the number of lines. Its target will be included in the document tree, 
	// and we'll count that as the actual line instead. The ref itself won't include any words, just a pointer.
	let countAsLine = lineItem.type == PLUGIN_LINE_ITEM_TYPE_REF ? false : true;
	const words = countAsLine ? countWordsFromSegments(lineItem.segments) : 0;
	return { words, lines: countAsLine ? 1 : 0 };
}

class Plugin extends AppPlugin {
	/** @type {string|null} */
	activeRecordGuid = null;
	/** @type {number} */
	totalWords = 0;
	/** @type {number} */
	totalLines = 0;
	/** @type {Map<string, {words: number, lines: number}>} */
	byLineGuid = new Map();
	/** @type {boolean} */
	recalcInProgress = false;
	/** @type {boolean} - events arrived during recalc, need to re-recalc */
	recalcDirty = false;
	/** @type {PluginStatusBarItem|null} */
	statusItem = null;

	onLoad() {
		this.activeRecordGuid = null;
		this.totalWords = 0;
		this.totalLines = 0;
		/* Track the number of words and lines for each line item we know about for this page, by guid. */
		this.byLineGuid = new Map();
		this.recalcInProgress = false;
		this.recalcDirty = false;

		this.statusItem = this.ui.addStatusBarItem({
			label: '—',
			icon: 'abc',
			tooltip: 'Words and lines in this document'
		});

		this.refreshFromActivePanel();
		this.events.on('panel.navigated', () => this.refreshFromActivePanel());
		this.events.on('panel.focused', () => this.refreshFromActivePanel());

		this.events.on('lineitem.created', (ev) => {
			const guid = ev.lineItemGuid;
			if (!guid || ev.recordGuid !== this.activeRecordGuid) return;
			if (this.recalcInProgress) { this.recalcDirty = true; return; }
			if (this.byLineGuid.has(guid)) return;
			// Register with zero counts. If the item was created with text,
			// a lineitem.updated event with segments will follow in the same
			// batch and update the count.
			this.byLineGuid.set(guid, { words: 0, lines: 1 });
			this.totalLines += 1;
			this.updateStatusLabel();
		});

		this.events.on('lineitem.updated', (ev) => {
			const guid = ev.lineItemGuid;
			if (!guid || ev.recordGuid !== this.activeRecordGuid) return;
			if (this.recalcInProgress) { this.recalcDirty = true; return; }
			if (!ev.hasSegments()) return;
			const prev = this.byLineGuid.get(guid) || { words: 0, lines: 1 };
			const segments = ev.getSegments();
			const newWords = segments ? countWordsFromSegments(segments) : prev.words;
			const newLines = 1;
			this.totalWords += newWords - prev.words;
			this.totalLines += newLines - prev.lines;
			this.byLineGuid.set(guid, { words: newWords, lines: newLines });
			this.updateStatusLabel();
		});

		// For moved and undeleted items we don't have segments in the event
		// payload. We could use async getLineItem() but then we need to add 
		// a queue to make sure our event handling ordering stays correct.
		// As moved and undeleted are infrequent events, we just trigger full recalc.
		this.events.on('lineitem.moved', (ev) => {
			const guid = ev.lineItemGuid;
			if (!guid) return;
			if (ev.recordGuid !== this.activeRecordGuid && !this.byLineGuid.has(guid)) return;
			this.fullRecalc();
		});

		this.events.on('lineitem.undeleted', (ev) => {
			if (ev.recordGuid !== this.activeRecordGuid) return;
			this.fullRecalc();
		});

		this.events.on('lineitem.deleted', (ev) => {
			const guid = ev.lineItemGuid;
			if (!guid || ev.recordGuid !== this.activeRecordGuid) return;
			if (this.recalcInProgress) { this.recalcDirty = true; return; }
			const prev = this.byLineGuid.get(guid);
			if (prev) {
				this.totalWords -= prev.words;
				this.totalLines -= prev.lines;
				this.byLineGuid.delete(guid);
				this.updateStatusLabel();
			}
		});

		this.events.on('reload', () => {
			if (this.activeRecordGuid) this.fullRecalc();
		});
	}

	async refreshFromActivePanel() {
		const panel = this.ui.getActivePanel();
		const record = panel ? panel.getActiveRecord() : null;
		const guid = record ? record.guid : null;
		if (guid !== this.activeRecordGuid) {
			this.activeRecordGuid = guid;
			await this.fullRecalc();
		} else {
			this.updateStatusLabel();
		}
	}

	async fullRecalc() {
		if (this.recalcInProgress) {
			// Requesting new recalc during our recalc? Do another recalc after the current one is complete.
			this.recalcDirty = true;
			return;
		}
		this.recalcInProgress = true;
		this.recalcDirty = false;
		this.totalWords = 0;
		this.totalLines = 0;
		this.byLineGuid.clear();
		try {
			const panel = this.ui.getActivePanel();
			const record = panel ? panel.getActiveRecord() : null;
			if (!record || record.guid !== this.activeRecordGuid) {
				this.activeRecordGuid = record ? record.guid : null;
				this.updateStatusLabel();
				return;
			}
			const items = await record.getLineItems();
			if (record.guid !== this.activeRecordGuid) return;
			for (const item of items) {
				const { words, lines } = wordsAndLinesForOneItem(item);
				this.byLineGuid.set(item.guid, { words, lines });
				this.totalWords += words;
				this.totalLines += lines;
			}
		} finally {
			this.recalcInProgress = false;
		}
		this.updateStatusLabel();
		if (this.recalcDirty) {
			await this.fullRecalc();
		}
	}

	updateStatusLabel() {
		if (!this.statusItem) return;
		if (this.activeRecordGuid == null) {
			this.statusItem.setLabel('—');
			return;
		}
		this.statusItem.setLabel(`${this.totalWords} words, ${this.totalLines} lines`);
	}
}
