function getTrailingBRs(item) {
	let last = item.children.at(-1);
	if (last?.type == 'br') {
		const i = item.children.findLastIndex(c => c.type != 'br');
		return item.children.slice(i + 1);
	}
	return last ? getTrailingBRs(last) : [];
}

function getLastDescendant(item) {
	const last = item.children.at(-1);
	return last ? getLastDescendant(last) : item;
}

/**
 * Move Completed Tasks Down - moves completed tasks below non-completed tasks
 */
class Plugin extends AppPlugin {
	onLoad() {
		this.ui.addCommandPaletteCommand({
			label: "Move completed tasks down",
			icon: "check",
			onSelected: () => this.moveCompletedTasks()
		});
	}

	async moveCompletedTasks() {
		const record = this.ui.getActivePanel()?.getActiveRecord();
		if (!record) return;

		debugger;

		const items = await record.getLineItems();
		const byParent = new Map();
		for (const item of items) {
			const p = item.parent_guid || record.guid;
			if (!byParent.has(p)) byParent.set(p, []);
			byParent.get(p).push(item);
		}

		let moved = 0;
		for (const siblings of byParent.values()) {
			for (let i = 0; i < siblings.length; i++) {
				if (siblings[i].isTaskCompleted() !== true) continue;

				// Find last consecutive non-completed task after this one
				let insertAfter = null;
				for (let j = i + 1; j < siblings.length; j++) {
					let sibling = siblings[j];
					if (sibling.type !== 'task') break;
					if (sibling.isTaskCompleted() !== true) insertAfter = sibling;
				}
				if (!insertAfter) continue;

				
				const movedTask = await siblings[i].move(null, insertAfter);
				if (!movedTask) continue;

				// Steal BRs - to turn
				// [✔] completed
				// [ ] task
				// (empty line)
				// 
				// into
				// [ ] task
				// [✔] completed
				// (empty line)
				
				const brsToSteal = getTrailingBRs(insertAfter);
				const lastDesc = getLastDescendant(movedTask);
				for (const br of brsToSteal) {
					br.move(null, lastDesc);
				}
				moved++;
			}
		}

		this.ui.addToaster({
			title: moved ? `${moved} item${moved === 1 ? '' : 's'} moved` : "No items needed moving",
			dismissible: true,
			autoDestroyTime: 3000
		});
	}
}
