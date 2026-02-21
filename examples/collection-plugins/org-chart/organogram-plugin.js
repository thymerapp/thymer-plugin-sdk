/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that shows an org-chart visualization for notes in a "People" collection (vibe-coded).
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few notes in the "People" collection with
 * the title being the name of a person, and the Manager property being the name of the person's manager (another
 * note with the same title). The people overview will now show on an interactive org-chart.
 * 
 * It demonstrates:
 * - Registering a custom view type
 * - Using the viewContext to access the collection records
 * - Using the viewContext to open records in other panels
 * - Using the viewContext to resize the view
 * - This view scrolls horizontally if needed
 * 
 * Example page Title/Manager values used for the example screenshot:
 * 
 * | Name     | Manager |
 * |----------|---------|
 * | Alice    |         |
 * | Bob      | Alice   |
 * | Clara    | Alice   |
 * | David    | Bob     |
 * | Ella     | Bob     |
 * | Farid    | Clara   |
 * | Grace    | Clara   |
 * | Hassan   | David   |
 * | Isabelle | David   |
 * | Jack     | Ella    |
 * | Kira     | Ella    |
 * | Luca     | Farid   |
 * | Mina     | Grace   |
 */

class Plugin extends CollectionPlugin {

	onLoad() {
		console.log("People plugin loaded");

		this.views.register("Organogram", (viewContext) => {
			const $element = viewContext.getElement();

			$element.innerHTML = /* html */ `
				<div id="organogram-container">
					<div id="organogram-canvas"></div>
				</div>
				<style>
					#organogram-container { 
						background: transparent; 
						width: 100%;
						height: 100%;
						min-height: 600px;
						display: flex;
						position: relative;
						cursor: default;
					}
					#organogram-canvas {
						width: 100%;
						height: 100%;
						position: relative;
						background: transparent;
					}
					.org-node {
						position: absolute;
						background: #4a90e2;
						color: white;
						padding: 8px 12px;
						border-radius: 6px;
						font-family: Arial, sans-serif;
						font-size: 12px;
						text-align: center;
						min-width: 80px;
						max-width: 120px;
						box-shadow: 0 2px 4px rgba(0,0,0,0.1);
						cursor: pointer;
						transition: all 0.2s ease;
					}
					.org-node:hover {
						background: #357abd;
						transform: scale(1.05);
						box-shadow: 0 4px 8px rgba(0,0,0,0.2);
					}
					.org-node.root {
						background: #e74c3c;
					}
					.org-node.root:hover {
						background: #c0392b;
					}
					.org-connection {
						position: absolute;
						background: #bdc3c7;
						height: 2px;
						transform-origin: left center;
					}
				</style>
			`;

			const $canvas = /** @type {HTMLElement} */ ($element.querySelector('#organogram-canvas'));
			if (!$canvas) {
				throw new Error("Organogram canvas not found");
			}

			/** @type {Map<string, {id: string, name: string, managerName: string, record: any, children: any[], level: number, x: number, y: number}>} */
			let nodes = new Map();
			/** @type {{from: {id: string, name: string, managerName: string, record: any, children: any[], level: number, x: number, y: number}, to: {id: string, name: string, managerName: string, record: any, children: any[], level: number, x: number, y: number}}[]} */
			let connections = [];

			/**
			 * Build the organizational hierarchy
			 * @param {any[]} records 
			 */
			function buildHierarchy(records) {
				nodes.clear();
				connections = [];

				// Create nodes for all records
				records.forEach(record => {
					const name = record.getName() || 'Unknown';
					const managerName = record.text('Manager') || '';
					
					nodes.set(name, {
						id: record.guid,
						name: name,
						managerName: managerName,
						record: record,
						children: [],
						level: 0,
						x: 0,
						y: 0
					});
				});

				// Build parent-child relationships
				/** @type {{id: string, name: string, managerName: string, record: any, children: any[], level: number, x: number, y: number}[]} */
				const rootNodes = [];
				nodes.forEach(node => {
					if (node.managerName && nodes.has(node.managerName)) {
						const manager = nodes.get(node.managerName);
						if (manager) {
							manager.children.push(node);
						}
					} else {
						rootNodes.push(node);
					}
				});

				// Calculate levels and positions
				rootNodes.forEach(root => {
					calculatePositions(root, 0, 0);
				});

				// Build connections
				nodes.forEach(node => {
					node.children.forEach(child => {
						connections.push({
							from: node,
							to: child
						});
					});
				});

				return { nodes: Array.from(nodes.values()), connections, rootNodes };
			}

			/**
			 * Calculate positions for nodes in the hierarchy
			 * @param {{id: string, name: string, managerName: string, record: any, children: any[], level: number, x: number, y: number}} node 
			 * @param {number} level 
			 * @param {number} xOffset 
			 */
			function calculatePositions(node, level, xOffset) {
				node.level = level;
				node.x = xOffset;

				if (node.children.length === 0) {
					node.y = level * 100;
					return { width: 100, height: 60 };
				}

				let totalWidth = 0;
				let childPositions = [];

				// Calculate positions for children
				node.children.forEach(child => {
					const childSize = calculatePositions(child, level + 1, xOffset + totalWidth);
					childPositions.push({ child, width: childSize.width });
					totalWidth += childSize.width;
				});

				// Position parent above children
				node.y = level * 100;
				node.x = xOffset + (totalWidth - 100) / 2; // Center parent above children

				return { width: Math.max(totalWidth, 100), height: 60 };
			}

			/**
			 * Render the organogram
			 * @param {any[]} records 
			 */
			function renderOrganogram(records) {
				if (!$canvas) {
					throw new Error("Organogram canvas not found");
				}
	
				const hierarchy = buildHierarchy(records);
				
				// Clear canvas
				$canvas.innerHTML = '';

				// Calculate canvas size
				let minX = 0, maxX = 0, minY = 0, maxY = 0;
				hierarchy.nodes.forEach(node => {
					minX = Math.min(minX, node.x);
					maxX = Math.max(maxX, node.x + 100);
					minY = Math.min(minY, node.y);
					maxY = Math.max(maxY, node.y + 60);
				});

				const canvasWidth = maxX - minX + 200;
				const canvasHeight = maxY - minY + 200;
				$canvas.style.width = `${canvasWidth}px`;
				$canvas.style.height = `${canvasHeight}px`;

				// Render connections
				hierarchy.connections.forEach(conn => {
					const connection = document.createElement('div');
					connection.className = 'org-connection';
					
					const fromX = conn.from.x + 50 - minX + 100;
					const fromY = conn.from.y + 30 - minY + 100;
					const toX = conn.to.x + 50 - minX + 100;
					const toY = conn.to.y + 30 - minY + 100;
					
					const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
					const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
					
					connection.style.width = `${length}px`;
					connection.style.left = `${fromX}px`;
					connection.style.top = `${fromY}px`;
					connection.style.transform = `rotate(${angle}deg)`;
					
					$canvas.appendChild(connection);
				});

				hierarchy.nodes.forEach(node => {
					const nodeElement = document.createElement('div');
					nodeElement.className = 'org-node';
					if (hierarchy.rootNodes.includes(node)) {
						nodeElement.classList.add('root');
					}
					
					nodeElement.textContent = node.name;
					nodeElement.style.left = `${node.x - minX + 100}px`;
					nodeElement.style.top = `${node.y - minY + 100}px`;
					
					nodeElement.addEventListener('click', () => {
						viewContext.openRecordInOtherPanel(node.id);
					});
					
					$canvas.appendChild(nodeElement);
				});
			}

			return {
				onLoad: () => {
					// Initial render will happen in onRefresh
				},
				onRefresh: ({records}) => {
					renderOrganogram(records);
				},
				onPanelResize: () => {
					// Re-render on resize to adjust layout
					const records = viewContext.getAllRecords();
					renderOrganogram(records);
				},
				onDestroy: () => {
					nodes.clear();
					connections = [];
				},
				onFocus: () => {
				},
				onBlur: () => {
				},
				onKeyboardNavigation: ({e}) => {
				},
			}
		});

	}
}
