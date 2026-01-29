/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
* 
* Example plugin which shows your typing speed (WPM) next to the cursor!
*
* Note: This is just a demo, so no guarantees on the accuracy of the WPM calculation; no typing diplomas just yet ;)
* 
* Try it out by installing the plugin (see README.md).
* 
*/

export class Plugin extends AppPlugin {
	
	onLoad() {
		// Track word completion timestamps for rolling WPM calculation
		this.wordTimestamps = [];
		this.wpm = 0;
		
		// Force block cursor style, tweak some other cursor styling
		this.ui.injectCSS(`
			html {
				--ed-caret-self-radius: 2px;
				--ed-caret-self-border-width: 0px;
				--ed-caret-self-background: color-mix(in srgb, currentColor 70%, transparent);
				--ed-caret-self-box-shadow: 0 0 2px currentColor;
			}
			.text-caret-usertag {
				display: none !important; 
			}
			div.listview-caret-self {
				border: none !important;
				margin: 0px !important;
				transition: background-color 0.3s;
			}
			div.listview-caret-self::after {
				position: absolute;
				top: -22px; 
				left: 0px;
				font-size: 12px;
				font-weight: bold;
				font-family: monospace;
				white-space: nowrap;
				padding: 2px 5px;
				border-radius: 4px;
				transition: color 0.3s, background-color 0.3s, text-shadow 0.3s;
			}
			
			@keyframes jiggle {
				0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
				10% { transform: translate(-6px, -4px) rotate(-12deg) scale(1.3); }
				20% { transform: translate(6px, 3px) rotate(10deg) scale(1.2); }
				30% { transform: translate(-5px, 4px) rotate(-8deg) scale(1.25); }
				40% { transform: translate(5px, -3px) rotate(8deg) scale(1.15); }
				50% { transform: translate(-4px, -2px) rotate(-6deg) scale(1.2); }
				60% { transform: translate(4px, 2px) rotate(6deg) scale(1.1); }
				70% { transform: translate(-3px, 2px) rotate(-4deg) scale(1.1); }
				80% { transform: translate(2px, -2px) rotate(3deg) scale(1.05); }
				90% { transform: translate(-1px, 1px) rotate(-2deg) scale(1.02); }
			}
			
			div.listview-caret-self.jiggle {
				animation: jiggle 0.8s ease-out;
			}
		`);
		
		// Dynamic style element for WPM values (survives cssText resets)
		this.wpmStyle = document.createElement('style');
		document.head.appendChild(this.wpmStyle);
		
		this.setupKeyboardTracking();
		this.setupCaretObserver();
		
		// Decay WPM over time when not typing
		this.decayInterval = setInterval(() => this.updateWPM(), 500);
		
		// Initial render
		this.updateCaretStyles();
	}

	setupKeyboardTracking() {
		// Use capture phase + passive so we see all keypresses without blocking
		this.keyHandler = (e) => {
			// Count space and enter as word completions
			if (e.key === ' ' || e.key === 'Enter') {
				this.wordTimestamps.push(Date.now());
				this.updateWPM();
			}
		};
		document.addEventListener('keydown', this.keyHandler, { capture: true, passive: true });
	}

	updateWPM() {
		const now = Date.now();
		const windowMs = 15000; // 15 second rolling window
		
		// Remove timestamps older than the window
		this.wordTimestamps = this.wordTimestamps.filter(t => now - t < windowMs);
		
		// Calculate WPM: words in window * (60000 / windowMs)
		const wordsInWindow = this.wordTimestamps.length;
		const prevWpm = this.wpm;
		this.wpm = Math.round(wordsInWindow * (60000 / windowMs));
		
		// Jiggle when crossing milestones going up
		const milestones = [40, 60, 80, 100];
		for (const m of milestones) {
			if (prevWpm < m && this.wpm >= m) {
				this.triggerJiggle(m);
				break;
			}
		}
		
		// Update all carets
		this.updateCaretStyles();
	}
	
	triggerJiggle(milestone) {
		const cheers = {
			40: 'Warming up!',
			60: 'On fire!',
			80: 'BEAST MODE!',
			100: 'Botlike!'
		};
		
		this.cheerText = cheers[milestone] || 'Nice!';
		this.updateCaretStyles();
		
		document.querySelectorAll('.listview-caret-self').forEach(el => {
			el.classList.remove('jiggle');
			// Force reflow to restart animation
			void el.offsetWidth;
			el.classList.add('jiggle');
		});
		
		setTimeout(() => {
			this.cheerText = null;
			this.updateCaretStyles();
			document.querySelectorAll('.listview-caret-self').forEach(el => {
				el.classList.remove('jiggle');
			});
		}, 800);
	}

	getWPMStyle(wpm) {
		// Color gradient from cool (blue) to hot (red) using theme variables
		let colorName, glowIntensity;
		
		if (wpm < 20) {
			colorName = 'blue';
			glowIntensity = 0;
		} else if (wpm < 40) {
			colorName = 'green';
			glowIntensity = 1;
		} else if (wpm < 60) {
			colorName = 'yellow';
			glowIntensity = 2;
		} else if (wpm < 80) {
			colorName = 'orange';
			glowIntensity = 3;
		} else {
			colorName = 'red';
			glowIntensity = 4;
		}
		
		const bg = `var(--enum-${colorName}-bg)`;
		const fg = `var(--enum-${colorName}-fg)`;
		
		// Build glow based on intensity
		let glow = 'none';
		if (glowIntensity === 1) {
			glow = `0 0 4px ${bg}`;
		} else if (glowIntensity === 2) {
			glow = `0 0 6px ${bg}`;
		} else if (glowIntensity === 3) {
			glow = `0 0 8px ${bg}, 0 0 12px ${bg}`;
		} else if (glowIntensity === 4) {
			glow = `0 0 10px ${bg}, 0 0 20px ${bg}, 0 0 30px ${bg}`;
		}
		
		return { bg, fg, glow };
	}

	updateCaretStyles() {
		const { bg, fg, glow } = this.getWPMStyle(this.wpm);
		const displayText = this.cheerText || `${this.wpm} wpm`;
		
		// Update via style element so it survives cssText resets on the caret
		this.wpmStyle.textContent = `
			div.listview-caret-self {
				background-color: ${bg} !important;
			}
			div.listview-caret-self::after {
				content: '${displayText}';
				color: ${fg};
				background-color: ${bg};
				text-shadow: ${glow};
			}
		`;
	}

	setupCaretObserver() {
		const attached = new WeakSet();
		
		const attach = (el) => {
			if (attached.has(el)) return;
			attached.add(el);
			this.updateCaretStyles();
		};
		
		// Watch for new caret elements
		new MutationObserver(mutations => {
			for (const m of mutations) {
				for (const node of m.addedNodes) {
					if (node.nodeType !== 1) continue;
					if (node.classList.contains('listview-caret-self')) {
						attach(node);
					} else if (node.querySelector) {
						node.querySelectorAll('.listview-caret-self').forEach(attach);
					}
				}
			}
		}).observe(document.body, {childList: true, subtree: true});
		
		// Initial scan
		document.querySelectorAll('.listview-caret-self').forEach(attach);
	}

	onUnload() {
		if (this.keyHandler) {
			document.removeEventListener('keydown', this.keyHandler, { capture: true, passive: true });
		}		
		if (this.decayInterval) {
			clearInterval(this.decayInterval);
		}
		if (this.wpmStyle) {
			this.wpmStyle.remove();
		}
	}
	
}
