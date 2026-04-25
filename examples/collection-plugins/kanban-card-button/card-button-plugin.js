/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that shows a button on the kanban board cards to mark them as completed.
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few project notes in the collection
 * with different Status values: "To do", "In Progress", and "Done".
 * 
 * It demonstrates:
 * - Using the default board view with afterRenderBoardCard
 * - Setting the current status choice (enum) value of a property
 * - Adding a button as part of the kanban card render hook using ui.createButton and afterRenderBoardCard
 */

const KANBAN_WIP_LIMIT = 3;

class Plugin extends CollectionPlugin {

	onLoad() {
		this.views.afterRenderBoardCard(null, ({ record, view, element, columnElement }) => {
            const statusId = record.prop('Status')?.choice() || 'to-do';
			if (statusId === 'in-progress') {
				element.appendChild(this.ui.createButton({
					label: 'Mark Completed',
					icon: 'star',
					onClick: () => {
						const prop = record.prop('Status');
						if (prop) {
							prop.setChoice('done');
						}
					}
				}));
			}
		});
	}
}
