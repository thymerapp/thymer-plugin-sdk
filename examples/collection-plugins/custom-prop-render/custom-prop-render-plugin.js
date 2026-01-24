/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that demonstrates custom table rendering and sorting features.
 * 
 * Features:
 * - Custom rendering for Difficulty as a color-coded data bar (values 0-100)
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

		// Custom rendering for Difficulty as a color-coded data bar
		this.properties.render("Difficulty", ({record, prop, view}) => {
			//Example: only render the custom property when the view is "Board"
			//if (view && view.name != "Board") {
			//	return null;
			//}
			let val = prop.number(); // TIP: you can also combine render() with formula()! .number() will use the result of formula()
			if (val === null) return null;

			const activeBars = Math.round((val / 100) * 20);
			const node = this.ui.$html("<span></span>")
			node.innerHTML = "";
			node.style.fontSize = "18px";

			for (let i = 0; i < 20; i++) {
				const bar = document.createElement('span');
				bar.textContent = '┃';
				bar.style.display = 'inline-block';
				bar.style.transition = 'color 0.3s ease';
				bar.style.marginRight = '-2px';
				bar.style.width = '6px';
				bar.style.textAlign = 'center';
				bar.style.color = 'transparent';
				if (i < activeBars) {
					if (i < 12) bar.style.color = 'var(--enum-green-bg)';
					else if (i < 17) bar.style.color = 'var(--enum-orange-bg)';
					else bar.style.color = 'var(--enum-fuchsia-fg)';
				}
				node.appendChild(bar);
			}

			return node;
		});

	}
}
