/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that demonstrates custom table rendering and sorting features.
 * 
 * Features:
 * - Custom table cell rendering for Project Code validation (red background if project ID't start with "PROJECT-")
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few projects with different project codes, 
 * customer names, and difficulty values. I tried the following AI-generated data as an example:
 * 
 * | Project Code | Customer Name  | Difficulty |
 * | ------------ | -------------- | ---------- |
 * | PROJECT-001  | Alice Morgan   | 42         |
 * | PROJECT-002  | Jason Lee      | 78         |
 * | FOO-003      | Karen Brooks   | 55         |
 * | PROJECT-004  | Daniel Chen    | 89         |
 * | PROJECT-005  | Sophia Turner  | 23         |
 * | BAR-006      | Marcus Wright  | 67         |
 * | PROJECT-007  | Emily Zhao     | 35         |
 * | PROJECT-008  | Thomas Bennett | 91         |
 * | BAZ-009      | Olivia Singh   | 60         |
 * | PROJECT-010  | Brian O’Connor | 74         |
 * 
 */

class Plugin extends CollectionPlugin {

	onLoad() {

		// Custom table cell rendering for Project Code validation (red background if doesn't start with "PROJECT-")
		this.views.afterRenderTableCell(null, ({record, view, prop, node, viewContext}) => {
			// Only apply custom rendering to Project Code field
			if (prop.name === 'Project Code') {
				const projectCode = prop.text() || '';
				
				// Check if project code starts with "PROJECT-"
				if (!projectCode.startsWith('PROJECT-')) {
					node.style.backgroundColor = '#ffebee'; // Light red background
					node.style.color = '#c62828'; // Dark red text
					node.style.fontWeight = 'bold';
					
					// Add a warning icon
					const warningIcon = document.createElement('span');
					warningIcon.classList.add('id--warn');
					warningIcon.textContent = '⚠️';
					warningIcon.style.marginRight = '4px';
					warningIcon.title = 'Project code should start with "PROJECT-"';
					
					// Insert warning icon at the beginning
					node.insertBefore(warningIcon, node.firstChild);
				} else {
					// Reset styling for valid project codes
					node.style.backgroundColor = '';
					node.style.color = '';
					node.style.fontWeight = '';
					
					// Remove any existing warning icons
					const existingWarning = node.querySelector('span.id--warn');
					if (existingWarning) {
						existingWarning.remove();
					}
				}
			}
		});
	}
}
