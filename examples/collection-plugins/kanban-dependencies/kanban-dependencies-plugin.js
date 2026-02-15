/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that shows dependencies between kanban cards. When a card depends on another card which does 
 * not have the status "Done", a red indicator is shown on the card ("Depends on X").
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few project notes in the collection
 * with different Status values: "To do", "In Progress", and "Done". Try setting the "Depends on" property for one
 * of the cards (notes) to another card which has status "To do" or "In Progress".
 * 
 * It demonstrates:
 * - Using the afterRenderBoardCard() hook
 * - Reading status/choice properties of a record (card)
 * - Getting a list of records in a collection
 * - Using custom CSS/HTML elements to show a dependency indicator on a card
 * - Using "link to another record" property type as a foreign key of sorts, to link cards together (to show the dependency)
 */

class Plugin extends CollectionPlugin {

	/**
	 * @param {PluginRecord} otherCard  - other card 
	 * @param {PluginRecord} record     - depends on this record
	 * @param {HTMLElement} rootElement - root element of kanban board
	 */
	_refreshDependency(otherCard, record, rootElement) {
		const $otherCardNode = rootElement.querySelector(`.board-card[data-guid='${otherCard.guid}']`);
		if (!$otherCardNode) return; // can't find other card
		const existingIndicator = $otherCardNode.querySelector('.id--depends-on-indicator');
		if (existingIndicator) {
			existingIndicator.remove();
			$otherCardNode.classList.remove('has-dependency');
		}

		const statusId = record.prop('status')?.choice();
		if (statusId == 'to-do' || statusId == 'in-progress') {
			const title = record.getName();
			const $dependsOnIndicator = document.createElement('div');
			$dependsOnIndicator.classList.add('id--depends-on-indicator');
			$dependsOnIndicator.innerText = `Depends on ${title}`;
			$otherCardNode.appendChild($dependsOnIndicator);
			$otherCardNode.classList.add('has-dependency');
		}
	}

	/**
	 * 
	 * @param {PluginRecord} otherCard 
	 * @param {PluginRecord} record 
	 * @param {HTMLElement} rootElement 
	 */
	refreshDependency(otherCard, record, rootElement) {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
		}
		// @ts-ignore
		this.refreshTimer = setTimeout(() => {
			this._refreshDependency(otherCard, record, rootElement);
			this.refreshTimer = null;
		}, 0);
	}

	/**
	 * 
	 * @param {PluginViewConfig} view 
	 * @param {PluginViewContext} viewContext 
	 */
	refreshDepedencies(view, viewContext) {
		if (this.refreshTimer) {
			clearTimeout(this.refreshTimer);
		}
		// @ts-ignore
		this.refreshTimer = setTimeout(() => {
			if (viewContext.isDestroyed()) return; // view has been closed while we were waiting for the next frame
			this._refreshDepedencies(view, viewContext);
		}, 0);
	}

	/**
	 * 
	 * @param {PluginViewConfig} view 
	 * @param {PluginViewContext} viewContext 
	 */
	_refreshDepedencies(view, viewContext) {
		const records = viewContext.getAllRecords();
		for (const otherCard of records) {
			const dependsOnGuid = otherCard.prop('depends-on')?.text() ?? null;
			if (!dependsOnGuid) continue; // no dependency
			if (dependsOnGuid == otherCard.guid) continue; // cycle
			const record = viewContext.getRecord(dependsOnGuid);
			if (!record) continue; // record not found
			this.refreshDependency(otherCard, record, viewContext.getElement());
		}
	}

	onLoad() {
		this.ui.injectCSS(`
			.has-dependency {
				border: 2px solid #f00;
				padding-top: 30px;
			}
			.id--depends-on-indicator {
				background-color: #f00;
				color: #fff;
				padding: 4px 8px;
				border-bottom-left-radius: 4px;
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				position: absolute;
				top: 0;
				right: 0;
			}
		`)

		/** @type {number?} */
		this.refreshTimer = null;

		this.views.afterRenderBoardCard(null, ({ view, viewContext, element, record, columnElement }) => {
			// When a card is updated, schedule refreshing all dependencies in next render frame (after all cards 
			// have done their updating/rendering).
			this.refreshDepedencies(view, viewContext);
		});
	}
}
