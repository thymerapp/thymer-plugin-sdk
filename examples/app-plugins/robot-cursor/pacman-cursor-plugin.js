/**
*
* NOTE: if you want to try this example right away without development project, create a new Plugin in Thymer 
* (Command Palette -> Plugins -> Create Plugin) and paste in the code from _another file_ in this directory: 
* 'pacman-cursor-plugin-dist.js'. The current file (pacman-cursor-plugin.js) only works together with the 
* 'npm run dev' dev build loop for development. See the SDK's README.md for more details.
*
* ***
* 
* Example plugin which turns your cursor into a walking robot!
*
* Note: just a fun demo to demonstrate a few concepts but obviously a bit of a hack, don't expect a 
* polished well-tested experience ;)
* 
* Try it out by installing the plugin (see README.md).
* 
* It demonstrates:
* - Adding custom CSS to a page
* - Including an asset within the plugin (they're inlined so not recommended for large files)
* - Interacting with other DOM elements in the app (in this case, the text caret)
*/
//import walker from './walker-8f2.png';
import walker from './pacman-8f2.png';

export class Plugin extends AppPlugin {
	
	onLoad() {

		this.ui.injectCSS(`
			.text-caret-usertag {
				display: none !important; 
			}
			div.listview-caret-self {
				border: none !important;
				margin: 0px !important;
				background-color: transparent !important;
				animation: blink 1s infinite !important;
			}
			div.listview-caret-self::after {
				content: '';
				position: absolute;
				top: -32px; left: -2px;
				width: 32px; height: 32px;
			
				background: url(${walker}) 0 0/256px 32px;
				transform: scaleX(var(--dir,1));
				animation:walk 1s steps(8) infinite paused;

				top: -16px;
				opacity: 1.0 !important;
			}

			.listview-caret-self.walking::after{ 
				animation-play-state: running; 
			}

			.listview-caret-self.walking {
				animation: none !important;
				opacity: 1.0 !important; 
			}

			@keyframes walk{to{background-position:-256px 0}}
			@keyframes blink{
				0%, 100% { opacity: 1.0 !important; }
				50% { opacity: 0.0 !important; }
			}
		
		`);
		this.createRobotCursor();
	}

	createRobotCursor() {
		const attached = new WeakSet();
		
		function attach(el) {
			if (attached.has(el)) return;
			attached.add(el);
			
			// Per-element state (fixes bug with shared state)
			let px = 0, py = 0, idle;
			
			new MutationObserver(() => {
				const x = parseFloat(el.dataset.x) || 0;
				const y = parseFloat(el.dataset.y) || 0;
				const dx = x - px, dy = y - py;
				if (dx || dy) {
					el.style.setProperty('--dir', dx < 0 ? '-1' : '1');
					el.classList.add('walking');
					clearTimeout(idle);
					idle = setTimeout(() => el.classList.remove('walking'), 300);
					px = x;
					py = y;
				}
			}).observe(el, {attributes: true, attributeFilter: ['data-x', 'data-y']});
		}
		
		// Only check added nodes, not full querySelectorAll on every mutation
		new MutationObserver(mutations => {
			for (const m of mutations) {
				for (const node of m.addedNodes) {
					if (node.nodeType !== 1) continue;
					if (node.classList.contains('listview-caret-self')) {
						attach(node);
					} else if (node.querySelector) {
						// Check descendants if a container was added
						node.querySelectorAll('.listview-caret-self').forEach(attach);
					}
				}
			}
		}).observe(document.body, {childList: true, subtree: true});
		
		// Initial scan only
		document.querySelectorAll('.listview-caret-self').forEach(attach);
	}

	onUnload() {
	}
	
}
