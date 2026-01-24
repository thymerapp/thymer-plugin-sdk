/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
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
import walker from './walker-8f2.png';

class Plugin extends AppPlugin {
	
	onLoad() {

		this.ui.injectCSS(`
			.text-caret-usertag {
				display: none !important;
			}
			div.text-caret {
				border: none !important;
				margin: 0px !important;
				animation: blink 1s infinite !important;
			}
			div.text-caret::after {
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

			.text-caret.walking::after{ 
				animation-play-state: running; 
			}

			.text-caret.walking {
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
		let caret, px=0, py=0, idle;

		function attach(el){
		  if(caret===el) return;
		  caret=el; px=py=0;
		
		  new MutationObserver(()=>{
			const {left,top}=caret.getBoundingClientRect(),
				  dx=left-px, dy=top-py;
			if(dx||dy){
			  caret.style.setProperty('--dir', dx<0?-1:1);
			  caret.classList.add('walking');
			  clearTimeout(idle);
			  idle=setTimeout(()=>caret.classList.remove('walking'),300);
			  px=left; py=top;
			}
		  }).observe(caret,{attributes:true,attributeFilter:['style']});
		}
		
		// watch for new .text-caret nodes 
		new MutationObserver(m=>m.forEach(rec=>{
		  rec.addedNodes.forEach(n=>{
			if(n.nodeType===1 && n.classList.contains('text-caret')) attach(n);
		  });
		})).observe(document.body,{childList:true,subtree:true});
		
		// attach to any caret already present
		document.querySelectorAll('.text-caret').forEach(attach);
	}

	onUnload() {
	}
	
}
