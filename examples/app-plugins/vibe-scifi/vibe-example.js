/**
 * Demo app plugin: registers a custom Vibe Shift for Focus Mode. When active, use Focus With Vibe >
 * 'Sci-fi Opening Crawl' to view your document in a Star Wars-like opening crawl style. Exit with
 * Cmd+P/Ctrl+P > Exit Focus Mode.
 * 
 * Demonstrates how to register a custom Vibe Shift for Focus Mode.
 * 
 * Limitations: just a demo with fun visual effects. The vibe has fun visuals but not built to be very 
 * responsive or work well for editing at all (cursor and selections don't show). Mostly fun for view-only 
 * and presentations :)
 * 
 */

class Plugin extends AppPlugin {

	onLoad() {
		this.ui.injectCSS(`
.vibe-shift.vibe-sci-fi .panel.has-focus {
	background-color: #05080f;
	background-image:
		radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.8), transparent),
		radial-gradient(1px 1px at 100px 120px, #fff, transparent),
		radial-gradient(1.5px 1.5px at 150px 60px, rgba(255,255,255,0.6), transparent),
		radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.9), transparent),
		radial-gradient(1px 1px at 110px 130px, #fff, transparent),
		radial-gradient(1px 1px at 30px 80px, rgba(255,255,255,0.7), transparent),
		radial-gradient(1px 1px at 60px 180px, #fff, transparent),
		radial-gradient(1.5px 1.5px at 170px 40px, rgba(255,255,255,0.5), transparent),
		radial-gradient(1px 1px at 80px 200px, rgba(255,255,255,0.8), transparent);
	background-size:
		200px 200px, 200px 200px, 200px 200px,
		170px 170px, 170px 170px, 170px 170px,
		230px 230px, 230px 230px, 230px 230px;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .panel-scroller-y {
	transform: perspective(400px) rotateX(30deg);
	transform-origin: 50% 30%;
	will-change: transform;
	-webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 100%);
	mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 100%);
}

html.vibe-shift.vibe-sci-fi .content-container,
html.vibe-shift.vibe-sci-fi .heading-title-area {
	--ed-text-color: #FFE81F;
	color: #FFE81F;
}

html.vibe-shift.vibe-sci-fi .listview-items {
	--font-weight-normal: 700 !important;
	font-weight: 700 !important;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .id--h1 {
	color: #FFE81F;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .panel-body,
html.vibe-shift.vibe-sci-fi .panel.has-focus .panel-heading {
	transform: scale(1.2);
	transform-origin: 50% 0%;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .layout-margin {
	max-width: min(504px, 62%);
	margin-left: auto;
	margin-right: auto;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus::before {
	display: none;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus {
	--vibe-sci-fi-compensate-x: -24px;
	--vibe-sci-fi-compensate-y: -8px;
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .listview-carets,
html.vibe-shift.vibe-sci-fi .panel.has-focus .listview-selections,
html.vibe-shift.vibe-sci-fi .panel.has-focus .listview-selection-drag-handles {
	transform: translate(var(--vibe-sci-fi-compensate-x), var(--vibe-sci-fi-compensate-y));
}

html.vibe-shift.vibe-sci-fi .panel.has-focus .item-drag-handle,
html.vibe-shift.vibe-sci-fi .panel.has-focus .item-drop-indicator-line {
	transform: translate(var(--vibe-sci-fi-compensate-x), var(--vibe-sci-fi-compensate-y));
}
`);
		this.ui.registerVibe({
			theme: 'thymer-dark-tokyo-techno',
			vibeClass: 'vibe-sci-fi',
			label: 'Sci-fi Opening Crawl',
			cat: 'animated',
		});
	}
}
