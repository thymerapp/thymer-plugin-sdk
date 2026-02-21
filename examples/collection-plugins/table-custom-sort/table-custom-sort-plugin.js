/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that demonstrates custom table rendering and sorting features.
 * 
 * Features:
 * - Custom sorting for Customer Name (sorts by last word, i.e. last name, instead of first name)
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

		// Custom sorting for Customer Name - sort by last word (e.g. "John Smith" -> sort as "Smith")
		this.properties.customSort("customer_name", ({records, propertyId, dir}) => {
			let rr = records.sort((a, b) => {
				const aVal = a.text(propertyId) || '';
				const bVal = b.text(propertyId) || '';
				const aLastWord = aVal.trim().split(' ').pop() || '';
				const bLastWord = bVal.trim().split(' ').pop() || '';
				return aLastWord.localeCompare(bLastWord);
			});
			if (dir === 'desc') {
				rr.reverse();
			}
			return rr;
		});

	}
    
}
