/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
* 
* Example plugin demonstrating the ui.addSidebarWidget() API.
* 
* "Sloppy" is a little vibe-coded character in the sidebar whose eyes follow your cursor.
* Complete tasks to trigger escalating celebration animations — keep a streak
* going and Sloppy will spin and throw confetti!
* 
* It demonstrates:
* - Using ui.addSidebarWidget() to render custom content in the sidebar
* - Using ui.injectCSS() to add global styles (cleaned up automatically on unload)
* - Listening to events.on('lineitem.updated') to react to completed tasks
* - Returning a cleanup function for proper teardown
*/

/** don't copy 'export' when copy-pasting directly into Custom Code field in Thymer */
export 
/* -- */
class Plugin extends AppPlugin {

	onLoad() {
		this.ui.injectCSS(`
			.sloppy { position: relative; display: flex; justify-content: center; padding: 10px 0 6px; }
			.sloppy-body { position: relative; display: inline-flex; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
			.sloppy-face { display: flex; gap: 10px; justify-content: center; }
			.sloppy-eye { width: 28px; height: 28px; border-radius: 50%; background: var(--side-bg-color); border: 2px solid var(--side-fg-color); position: relative; overflow: hidden; }
			.sloppy-pupil { width: 10px; height: 10px; border-radius: 50%; background: var(--side-fg-color); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
			.sloppy-arm {
				position: absolute; top: 22px; width: 4px; height: 20px;
				background: var(--side-fg-color); border-radius: 2px;
				transform-origin: top center;
				transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
			}
			.sloppy-arm-left { left: -8px; transform: rotate(-20deg); }
			.sloppy-arm-right { right: -8px; transform: rotate(20deg); }

			.sloppy.celebrate-1 .sloppy-arm-left { transform: rotate(140deg); }
			.sloppy.celebrate-1 .sloppy-arm-right { transform: rotate(-140deg); }

			.sloppy.celebrate-2 .sloppy-arm-left { transform: rotate(80deg); }
			.sloppy.celebrate-2 .sloppy-arm-right { transform: rotate(80deg); }

			.sloppy.celebrate-3 .sloppy-body { transform: rotate(-10deg); }
			.sloppy.celebrate-3 .sloppy-arm-left { transform: rotate(140deg); }
			.sloppy.celebrate-3 .sloppy-arm-right { transform: rotate(-60deg); }

			.sloppy.celebrate-4 .sloppy-body { transform: rotate(10deg); }
			.sloppy.celebrate-4 .sloppy-arm-left { transform: rotate(-60deg); }
			.sloppy.celebrate-4 .sloppy-arm-right { transform: rotate(-140deg); }

			.sloppy.celebrate-5 .sloppy-arm-left { transform: rotate(140deg); }
			.sloppy.celebrate-5 .sloppy-arm-right { transform: rotate(-140deg); }

			.sloppy-confetti { position: absolute; width: 8px; height: 8px; border-radius: 50%; top: 50%; left: 50%; pointer-events: none; opacity: 0; }
			.sloppy.celebrate-5 .sloppy-confetti { animation: sloppy-confetti-pop 0.8s ease-out forwards; }
			.sloppy.celebrate-6 .sloppy-confetti { animation: sloppy-confetti-pop 0.8s ease-out forwards; }

			@keyframes sloppy-confetti-pop {
				0% { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
				100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--cx), var(--cy)) scale(0.5); }
			}

			.sloppy.celebrate-6 .sloppy-body { animation: sloppy-spin 0.6s ease-in-out; }
			.sloppy.celebrate-6 .sloppy-arm-left { transform: rotate(140deg); }
			.sloppy.celebrate-6 .sloppy-arm-right { transform: rotate(-140deg); }

			@keyframes sloppy-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
		`);

		this.ui.addSidebarWidget((container, {refresh}) => {
			const confettiColors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6fff', '#ffab4a'];
			let confettiHtml = '';
			for (let i = 0; i < 24; i++) {
				const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
				const dist = 35 + Math.random() * 35;
				const cx = Math.cos(angle) * dist;
				const cy = Math.sin(angle) * dist - 10;
				const color = confettiColors[i % confettiColors.length];
				confettiHtml += `<div class="sloppy-confetti" style="--cx:${cx.toFixed(0)}px;--cy:${cy.toFixed(0)}px;background:${color};animation-delay:${(i * 30)}ms"></div>`;
			}
			container.innerHTML = /* html */`
				<div class="sloppy">
					<div class="sloppy-body">
						<div class="sloppy-arm sloppy-arm-left"></div>
						<div class="sloppy-arm sloppy-arm-right"></div>
						<div class="sloppy-face">
							<div class="sloppy-eye"><div class="sloppy-pupil"></div></div>
							<div class="sloppy-eye"><div class="sloppy-pupil"></div></div>
						</div>
						${confettiHtml}
					</div>
				</div>
			`;

			const sloppy = /** @type {HTMLElement} */(container.querySelector('.sloppy'));
			const eyes = container.querySelectorAll('.sloppy-eye');

			const onMouseMove = (/** @type {MouseEvent} */ e) => {
				for (const eye of eyes) {
					const rect = eye.getBoundingClientRect();
					if (rect.width === 0) continue;
					const cx = rect.left + rect.width / 2;
					const cy = rect.top + rect.height / 2;
					const dx = e.clientX - cx;
					const dy = e.clientY - cy;
					const angle = Math.atan2(dy, dx);
					const dist = Math.hypot(dx, dy);
					const maxR = rect.width / 2 - 7;
					const r = Math.min(dist, maxR);
					const pupil = eye.querySelector('.sloppy-pupil');
					if (pupil) {
						/** @type {HTMLElement} */(pupil).style.transform = `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`;
					}
				}
			};

			let streak = 0;
			let streakResetTimeout = /** @type {any} */(0);
			let celebrateTimeout = /** @type {any} */(0);
			const maxCelebrations = 6;

			const clearCelebration = () => {
				for (let i = 1; i <= maxCelebrations; i++) sloppy.classList.remove(`celebrate-${i}`);
			};

			const celebrate = () => {
				streak++;
				const level = Math.min(streak, maxCelebrations);

				clearCelebration();
				void sloppy.offsetWidth;
				sloppy.classList.add(`celebrate-${level}`);

				clearTimeout(celebrateTimeout);
				celebrateTimeout = setTimeout(clearCelebration, 1500);

				clearTimeout(streakResetTimeout);
				streakResetTimeout = setTimeout(() => { streak = 0; }, 4000);
			};

			const evId = this.events.on('lineitem.updated', (ev) => {
				if (ev.source.isLocal && ev.status === 'done') {
					celebrate();
				}
			}, {collection: '*'});

			document.addEventListener('mousemove', onMouseMove);
			return () => {
				document.removeEventListener('mousemove', onMouseMove);
				this.events.off(evId);
				clearTimeout(celebrateTimeout);
				clearTimeout(streakResetTimeout);
			};
		});
	}
}
