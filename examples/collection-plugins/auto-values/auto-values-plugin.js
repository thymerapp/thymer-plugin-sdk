/**
 * (See the plugin-sdk's README.md for how to install and test these examples.)
 *
 * Example collection plugin that demonstrates:
 *
 * 1. Auto-values on create: whenever a new invoice (record) is created in this collection,
 *    the Status property is automatically set to "Pending".
 *
 * 2. Reacting to record updates: when a record's Status is changed to "Paid", the plugin
 *    sets the "Paid at" property to today's date. This shows using the Events API to
 *    listen for record.updated and apply other property changes based on what changed.
 *
 * The collection has a table view and a kanban view grouped by Status. Field IDs used
 * in code must match the plugin.json: status (choice: pending, paid), paid_at (datetime).
 */

export class Plugin extends CollectionPlugin {

	onLoad() {
		const collectionGuid = this.collectionRoot.guid;

		this.events.on('record.created', (ev) => {
			if (ev.collectionGuid !== collectionGuid) return;
			const record = ev.getRecord();
			if (!record) return;
			record.prop('Status').setChoice('Pending');
		});

		this.events.on('record.updated', (ev) => {
			if (ev.collectionGuid !== collectionGuid) return;
			const props = ev.properties;
			// Did we update any properties, and is Status (id "status") one of them?
			if (!props || !props.status) return;
			const record = ev.getRecord();
			if (!record) return;
			const statusLabel = record.prop("Status").choiceLabel();
			if (statusLabel != "Paid") return; // Only continue when set to Paid
			record.prop('Paid at').setFromDate(new Date());
		});
	}
}
