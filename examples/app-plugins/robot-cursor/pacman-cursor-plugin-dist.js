"use strict";
var plugins = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugin.js
  var plugin_exports = {};
  __export(plugin_exports, {
    Plugin: () => Plugin
  });

  // pacman-8f2.png
  var pacman_8f2_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwAAAACACAYAAAC82Q7LAAAFSklEQVR4nO3dUVKcUBCGUUxlEZp1uIws12W4Ds0uzIMvBqkAM8B/7+1zHq3EjB9mii4aZpoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgHY8pF/Ard5epo/513797vfn6Y3+Wfpn6Z+lf5b+WfpnjdL/R/oFAAAA1zEAAABAIQYAAAAoJLaztLRDldbjDtet9M/SP0v/LP2z9M/SP0v/T64AAABAIQYAAAAoxAAAAACFXLZztHfn6unx2H///c/+vzPSTpz+Wfpn6Z+lf5b+Wfpn6b/MFQAAACjEAAAAAIUYAAAAoJDTdozWdq6O3rG615YdrZ524vTP0j9L/yz9s/TP0j9L/21cAQAAgEIMAAAAUIgBAAAACjlsp6i3nast5ntZLe/Ajda/t51E/bP0z9I/S/8s/bP0v83Pe7/ByFr6BQcAgCNYAQIAgEIMAAAAUMjNKy6j7VwteXhudwWoQv+5lu7JqNa/tZ1Q/b/T/zz6Z+mfpX/eGec/7gH4ouUTftyTAQDUc8b5T5cDwMPz+p/5eD3/dVSlf5b+Wfpn6Z+lf5b+WSP1dw8AAAAUYgAAAIBCulwBOoqd/7Y5PgBANVec/7gCAAAAhRgAAACgkMNWgEZ87mpP9M8avf/Sz7fl2dBXqda/pfbTpH+a/lnV+k9TW8dg9P5nKXUPgJ3ytjgeffO5DAA1ef+/TwvnP1aAAACgkC6vAPTyIQuj0j9L/yz9s/TP0j9L/6yR+rsCAAAAhXR5BWCrFnasKtO/bY4PQE3e/8/VQ19XAAAAoBADAAAAFLJ5BejtZfo484Xwf/pn6Z+lf5b+6+aNjnxMov5Z+mfpf46h7gHoYedqZPpn6Z+lP5X5/c/SP6vH/laAAACgEAMAAAAUMtQK0Mfrv3tiPV6S6Zn+WfP+axyfY+3tf4/3P9+/duTOOezl9z/L+39Wj+c/mweA+X8uN2VcS/8s/bP0z9J/3ZknoPpn6Z+l/zmsAAEAQCEGAAAAKGSoewDmetzJGsnaTqLjkXXvzq7jB9An7//n6uH8xxUAAAAoxAAAAACFGAAAAKCQw+4BmD+X9+nxqO98nJHvCeih/1wPO3Jb9dh/j6Xnbs8fxZZ8DnfF/i3RP0v/rIr9vf/fp4XzH1cAAACgEAMAAAAUYgAAAIBChv4cgDUj3xMwAscHAKjmivMfVwAAAKAQAwAAABRiAAAAgEJOuwdghOey9rxz3mP/r1p/7vCaEfv3RP8s/bP0z9I/a8T+Z5z/3DwAzP/x+YvjXPpn6Z8dwPTXP03/LP2z9O+fFSAAACjEAAAAAIVc9jkAre9k9b5zvqbH/iPRP0v/LP2z9M/SP0v/ZYcNAHaysir0b3kA0z9L/yz9s/TP0j9L/9tYAQIAgEIMAAAAUMhl9wDMre08Hb2jNfqO2176Z+mfpX+W/ln6Z+mfpf+ny3a69u5ktXAAWt5520v/LP2z9M/SP0v/LP2z9F9mBQgAAAoxAAAAQCGxewDWtLozVYX+Wfpn6Z+lf5b+WfpnVekf2/Fq8TmtI+28rdE/S/8s/bP0z9I/S/8s/T9ZAQIAgEIMAAAAUIgBAAAACul252tph6vSDlua/ln6Z+mfpX+W/ln6Z43S3xUAAAAoxAAAAACFGAAAAAAAAGBEfwHLwIjeyx6SxwAAAABJRU5ErkJggg==";

  // plugin.js
  var Plugin = class extends AppPlugin {
    static {
      __name(this, "Plugin");
    }
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
			
				background: url(${pacman_8f2_default}) 0 0/256px 32px;
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
      const attached = /* @__PURE__ */ new WeakSet();
      function attach(el) {
        if (attached.has(el)) return;
        attached.add(el);
        let px = 0, py = 0, idle;
        new MutationObserver(() => {
          const x = parseFloat(el.dataset.x) || 0;
          const y = parseFloat(el.dataset.y) || 0;
          const dx = x - px, dy = y - py;
          if (dx || dy) {
            el.style.setProperty("--dir", dx < 0 ? "-1" : "1");
            el.classList.add("walking");
            clearTimeout(idle);
            idle = setTimeout(() => el.classList.remove("walking"), 300);
            px = x;
            py = y;
          }
        }).observe(el, { attributes: true, attributeFilter: ["data-x", "data-y"] });
      }
      __name(attach, "attach");
      new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.classList.contains("listview-caret-self")) {
              attach(node);
            } else if (node.querySelector) {
              node.querySelectorAll(".listview-caret-self").forEach(attach);
            }
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
      document.querySelectorAll(".listview-caret-self").forEach(attach);
    }
    onUnload() {
    }
  };
  return __toCommonJS(plugin_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcGx1Z2luLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiogKFNlZSB0aGUgcGx1Z2luLXNkaydzIFJFQURNRS5tZCBmb3IgbW9yZSBkZXRhaWxzIG9uIGhvdyB0byBpbnN0YWxsIGFuZCB0ZXN0IHRoZXNlIGV4YW1wbGVzLilcbiogXG4qIEV4YW1wbGUgcGx1Z2luIHdoaWNoIHR1cm5zIHlvdXIgY3Vyc29yIGludG8gYSB3YWxraW5nIHJvYm90IVxuKlxuKiBOb3RlOiBqdXN0IGEgZnVuIGRlbW8gdG8gZGVtb25zdHJhdGUgYSBmZXcgY29uY2VwdHMgYnV0IG9idmlvdXNseSBhIGJpdCBvZiBhIGhhY2ssIGRvbid0IGV4cGVjdCBhIFxuKiBwb2xpc2hlZCB3ZWxsLXRlc3RlZCBleHBlcmllbmNlIDspXG4qIFxuKiBUcnkgaXQgb3V0IGJ5IGluc3RhbGxpbmcgdGhlIHBsdWdpbiAoc2VlIFJFQURNRS5tZCkuXG4qIFxuKiBJdCBkZW1vbnN0cmF0ZXM6XG4qIC0gQWRkaW5nIGN1c3RvbSBDU1MgdG8gYSBwYWdlXG4qIC0gSW5jbHVkaW5nIGFuIGFzc2V0IHdpdGhpbiB0aGUgcGx1Z2luICh0aGV5J3JlIGlubGluZWQgc28gbm90IHJlY29tbWVuZGVkIGZvciBsYXJnZSBmaWxlcylcbiogLSBJbnRlcmFjdGluZyB3aXRoIG90aGVyIERPTSBlbGVtZW50cyBpbiB0aGUgYXBwIChpbiB0aGlzIGNhc2UsIHRoZSB0ZXh0IGNhcmV0KVxuKi9cbi8vaW1wb3J0IHdhbGtlciBmcm9tICcuL3dhbGtlci04ZjIucG5nJztcbmltcG9ydCB3YWxrZXIgZnJvbSAnLi9wYWNtYW4tOGYyLnBuZyc7XG5cbmV4cG9ydCBjbGFzcyBQbHVnaW4gZXh0ZW5kcyBBcHBQbHVnaW4ge1xuXHRcblx0b25Mb2FkKCkge1xuXG5cdFx0dGhpcy51aS5pbmplY3RDU1MoYFxuXHRcdFx0LnRleHQtY2FyZXQtdXNlcnRhZyB7XG5cdFx0XHRcdGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgXG5cdFx0XHR9XG5cdFx0XHRkaXYubGlzdHZpZXctY2FyZXQtc2VsZiB7XG5cdFx0XHRcdGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHRtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuXHRcdFx0XHRhbmltYXRpb246IGJsaW5rIDFzIGluZmluaXRlICFpbXBvcnRhbnQ7XG5cdFx0XHR9XG5cdFx0XHRkaXYubGlzdHZpZXctY2FyZXQtc2VsZjo6YWZ0ZXIge1xuXHRcdFx0XHRjb250ZW50OiAnJztcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHR0b3A6IC0zMnB4OyBsZWZ0OiAtMnB4O1xuXHRcdFx0XHR3aWR0aDogMzJweDsgaGVpZ2h0OiAzMnB4O1xuXHRcdFx0XG5cdFx0XHRcdGJhY2tncm91bmQ6IHVybCgke3dhbGtlcn0pIDAgMC8yNTZweCAzMnB4O1xuXHRcdFx0XHR0cmFuc2Zvcm06IHNjYWxlWCh2YXIoLS1kaXIsMSkpO1xuXHRcdFx0XHRhbmltYXRpb246d2FsayAxcyBzdGVwcyg4KSBpbmZpbml0ZSBwYXVzZWQ7XG5cblx0XHRcdFx0dG9wOiAtMTZweDtcblx0XHRcdFx0b3BhY2l0eTogMS4wICFpbXBvcnRhbnQ7XG5cdFx0XHR9XG5cblx0XHRcdC5saXN0dmlldy1jYXJldC1zZWxmLndhbGtpbmc6OmFmdGVyeyBcblx0XHRcdFx0YW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7IFxuXHRcdFx0fVxuXG5cdFx0XHQubGlzdHZpZXctY2FyZXQtc2VsZi53YWxraW5nIHtcblx0XHRcdFx0YW5pbWF0aW9uOiBub25lICFpbXBvcnRhbnQ7XG5cdFx0XHRcdG9wYWNpdHk6IDEuMCAhaW1wb3J0YW50OyBcblx0XHRcdH1cblxuXHRcdFx0QGtleWZyYW1lcyB3YWxre3Rve2JhY2tncm91bmQtcG9zaXRpb246LTI1NnB4IDB9fVxuXHRcdFx0QGtleWZyYW1lcyBibGlua3tcblx0XHRcdFx0MCUsIDEwMCUgeyBvcGFjaXR5OiAxLjAgIWltcG9ydGFudDsgfVxuXHRcdFx0XHQ1MCUgeyBvcGFjaXR5OiAwLjAgIWltcG9ydGFudDsgfVxuXHRcdFx0fVxuXHRcdFxuXHRcdGApO1xuXHRcdHRoaXMuY3JlYXRlUm9ib3RDdXJzb3IoKTtcblx0fVxuXG5cdGNyZWF0ZVJvYm90Q3Vyc29yKCkge1xuXHRcdGNvbnN0IGF0dGFjaGVkID0gbmV3IFdlYWtTZXQoKTtcblx0XHRcblx0XHRmdW5jdGlvbiBhdHRhY2goZWwpIHtcblx0XHRcdGlmIChhdHRhY2hlZC5oYXMoZWwpKSByZXR1cm47XG5cdFx0XHRhdHRhY2hlZC5hZGQoZWwpO1xuXHRcdFx0XG5cdFx0XHQvLyBQZXItZWxlbWVudCBzdGF0ZSAoZml4ZXMgYnVnIHdpdGggc2hhcmVkIHN0YXRlKVxuXHRcdFx0bGV0IHB4ID0gMCwgcHkgPSAwLCBpZGxlO1xuXHRcdFx0XG5cdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHggPSBwYXJzZUZsb2F0KGVsLmRhdGFzZXQueCkgfHwgMDtcblx0XHRcdFx0Y29uc3QgeSA9IHBhcnNlRmxvYXQoZWwuZGF0YXNldC55KSB8fCAwO1xuXHRcdFx0XHRjb25zdCBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7XG5cdFx0XHRcdGlmIChkeCB8fCBkeSkge1xuXHRcdFx0XHRcdGVsLnN0eWxlLnNldFByb3BlcnR5KCctLWRpcicsIGR4IDwgMCA/ICctMScgOiAnMScpO1xuXHRcdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3dhbGtpbmcnKTtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoaWRsZSk7XG5cdFx0XHRcdFx0aWRsZSA9IHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnd2Fsa2luZycpLCAzMDApO1xuXHRcdFx0XHRcdHB4ID0geDtcblx0XHRcdFx0XHRweSA9IHk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLm9ic2VydmUoZWwsIHthdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnZGF0YS14JywgJ2RhdGEteSddfSk7XG5cdFx0fVxuXHRcdFxuXHRcdC8vIE9ubHkgY2hlY2sgYWRkZWQgbm9kZXMsIG5vdCBmdWxsIHF1ZXJ5U2VsZWN0b3JBbGwgb24gZXZlcnkgbXV0YXRpb25cblx0XHRuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuXHRcdFx0Zm9yIChjb25zdCBtIG9mIG11dGF0aW9ucykge1xuXHRcdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2YgbS5hZGRlZE5vZGVzKSB7XG5cdFx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnbGlzdHZpZXctY2FyZXQtc2VsZicpKSB7XG5cdFx0XHRcdFx0XHRhdHRhY2gobm9kZSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChub2RlLnF1ZXJ5U2VsZWN0b3IpIHtcblx0XHRcdFx0XHRcdC8vIENoZWNrIGRlc2NlbmRhbnRzIGlmIGEgY29udGFpbmVyIHdhcyBhZGRlZFxuXHRcdFx0XHRcdFx0bm9kZS5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdHZpZXctY2FyZXQtc2VsZicpLmZvckVhY2goYXR0YWNoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KS5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWV9KTtcblx0XHRcblx0XHQvLyBJbml0aWFsIHNjYW4gb25seVxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0dmlldy1jYXJldC1zZWxmJykuZm9yRWFjaChhdHRhY2gpO1xuXHR9XG5cblx0b25VbmxvYWQoKSB7XG5cdH1cblx0XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QTs7Ozs7QUFrQk8sTUFBTSxTQUFOLGNBQXFCLFVBQVU7QUFBQSxJQWxCdEMsT0FrQnNDO0FBQUE7QUFBQTtBQUFBLElBRXJDLFNBQVM7QUFFUixXQUFLLEdBQUcsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQWdCRSxrQkFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0F1QnpCO0FBQ0QsV0FBSyxrQkFBa0I7QUFBQSxJQUN4QjtBQUFBLElBRUEsb0JBQW9CO0FBQ25CLFlBQU0sV0FBVyxvQkFBSSxRQUFRO0FBRTdCLGVBQVMsT0FBTyxJQUFJO0FBQ25CLFlBQUksU0FBUyxJQUFJLEVBQUUsRUFBRztBQUN0QixpQkFBUyxJQUFJLEVBQUU7QUFHZixZQUFJLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFFcEIsWUFBSSxpQkFBaUIsTUFBTTtBQUMxQixnQkFBTSxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSztBQUN0QyxnQkFBTSxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSztBQUN0QyxnQkFBTSxLQUFLLElBQUksSUFBSSxLQUFLLElBQUk7QUFDNUIsY0FBSSxNQUFNLElBQUk7QUFDYixlQUFHLE1BQU0sWUFBWSxTQUFTLEtBQUssSUFBSSxPQUFPLEdBQUc7QUFDakQsZUFBRyxVQUFVLElBQUksU0FBUztBQUMxQix5QkFBYSxJQUFJO0FBQ2pCLG1CQUFPLFdBQVcsTUFBTSxHQUFHLFVBQVUsT0FBTyxTQUFTLEdBQUcsR0FBRztBQUMzRCxpQkFBSztBQUNMLGlCQUFLO0FBQUEsVUFDTjtBQUFBLFFBQ0QsQ0FBQyxFQUFFLFFBQVEsSUFBSSxFQUFDLFlBQVksTUFBTSxpQkFBaUIsQ0FBQyxVQUFVLFFBQVEsRUFBQyxDQUFDO0FBQUEsTUFDekU7QUFwQlM7QUF1QlQsVUFBSSxpQkFBaUIsZUFBYTtBQUNqQyxtQkFBVyxLQUFLLFdBQVc7QUFDMUIscUJBQVcsUUFBUSxFQUFFLFlBQVk7QUFDaEMsZ0JBQUksS0FBSyxhQUFhLEVBQUc7QUFDekIsZ0JBQUksS0FBSyxVQUFVLFNBQVMscUJBQXFCLEdBQUc7QUFDbkQscUJBQU8sSUFBSTtBQUFBLFlBQ1osV0FBVyxLQUFLLGVBQWU7QUFFOUIsbUJBQUssaUJBQWlCLHNCQUFzQixFQUFFLFFBQVEsTUFBTTtBQUFBLFlBQzdEO0FBQUEsVUFDRDtBQUFBLFFBQ0Q7QUFBQSxNQUNELENBQUMsRUFBRSxRQUFRLFNBQVMsTUFBTSxFQUFDLFdBQVcsTUFBTSxTQUFTLEtBQUksQ0FBQztBQUcxRCxlQUFTLGlCQUFpQixzQkFBc0IsRUFBRSxRQUFRLE1BQU07QUFBQSxJQUNqRTtBQUFBLElBRUEsV0FBVztBQUFBLElBQ1g7QUFBQSxFQUVEOyIsCiAgIm5hbWVzIjogW10KfQo=
