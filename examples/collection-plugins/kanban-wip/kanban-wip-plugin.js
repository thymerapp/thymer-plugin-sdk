/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that shows a Kanban board with WIP (Work In Progress) limits. A Kanban WIP limit (originating in 
 * Lean manufacturing's pull-system and adopted by agile software practices) sets an explicit cap on how many tasks 
 * can sit in a workflow stage (or the whole board) at once.
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few project notes in the collection
 * with different Status values: "To do", "In Progress", and "Done".
 * 
 * The Kanban board will show cards in columns based on their status, and will highlight columns that exceed the
 * WIP limit of 3 cards with a red background.
 * 
 * It demonstrates:
 * - Using the default board view with afterRenderBoardCard and afterRenderBoardColumn
 * - Grouping records by a field value
 * - Dynamic styling based on record counts
 */

const KANBAN_WIP_LIMIT = 3;

class Plugin extends CollectionPlugin {

	onLoad() {
		console.log("Kanban WIP plugin loaded");

		this.ui.injectCSS(`
			.wip-exceeded .id--wip-card {
				background: #fcc !important;
				color: #c33 !important;
			}
		`);

		// Marking and then counting cards!...

		// - Add our "id--wip-card" to all kanban board cards
		this.views.afterRenderBoardCard(null, ({ record, view, element, columnElement }) => {
			element.classList.add('id--wip-card');
		});
		
		// - After the kanban board column is rendered, we can count the cards in the column
		this.views.afterRenderBoardColumn(null, ({ view, columnElement, choiceId }) => {

			if (choiceId === 'in-progress') {
				const nrCards = columnElement.querySelectorAll('.id--wip-card').length;
				if (nrCards > KANBAN_WIP_LIMIT) {
					columnElement.classList.add('wip-exceeded');
				} else {
					columnElement.classList.remove('wip-exceeded');
				}
			}
		});
	}
}
