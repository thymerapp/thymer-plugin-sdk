/**
 * Protocol Action Demo
 *
 * This app plugin demonstrates the desktop-only `thymer://.../plugin-action`
 * path for external launchers and OS-level shortcut tools. A protocol action
 * lets an outside program open a URL and deliver a small action object to
 * plugins running in an open Thymer desktop workspace window.
 *
 * URL format:
 *
 *   thymer://<accountHost>/plugin-action?workspaceGuid=<workspaceGuid>&action=<actionName>&key=value
 *
 * Example URL used by this plugin:
 *
 *   thymer://account.example/plugin-action?workspaceGuid=<workspaceGuid>&action=protocol-action-demo.toast&message=Hello
 *
 * Field meaning:
 *
 * - `<accountHost>` is the host part of the Thymer account URL, for example
 *   `account.example`. Desktop uses this to find the open account window.
 * - `/plugin-action` selects plugin-action dispatch instead of normal app
 *   URL routing.
 * - `workspaceGuid` selects the open workspace that should receive the action.
 * - `action` is a caller-defined action name. Every loaded plugin in that
 *   workspace receives the action, so plugins should use namespaced action
 *   values such as `protocol-action-demo.toast` and ignore unrelated actions.
 * - Additional query parameters are user-defined arguments for the action.
 *   They are copied onto the same flat action object. For example,
 *   `message=Hello` becomes `action.message === "Hello"`.
 * - Repeated query parameters become arrays. For example, `tag=one&tag=two`
 *   becomes `action.tag === ["one", "two"]`.
 *
 * The object passed to onProtocolAction(action) always includes:
 *
 * - `rawUrl`: the original `thymer://` URL.
 * - `accountHost`: the URL host.
 * - `workspaceGuid`: the workspace GUID from the URL.
 * - `action`: the action name from the URL.
 *
 * This example registers a custom panel with a generated URL for the current
 * account and workspace. Opening that URL calls onProtocolAction(), where the
 * plugin filters for `protocol-action-demo.toast`, focuses the desktop window,
 * and shows a toast using the `message` and `source` URL arguments.
 *
 * Protocol actions are dispatched to plugins in open workspace windows only.
 */

const PANEL_ID = 'protocol-action-demo';
const ACTION_TOAST = 'protocol-action-demo.toast';

class Plugin extends AppPlugin {
	onLoad() {
		this.ui.registerCustomPanelType(PANEL_ID, (panel) => this.renderDemoPanel(panel));
		this.ui.addStatusBarItem({
			label: 'Protocol demo',
			icon: 'ti-link',
			tooltip: 'Open the protocol action demo',
			onClick: async () => {
				const panel = await this.ui.createPanel();
				panel.navigateToCustomType(PANEL_ID);
			}
		});
	}

	/**
	 * Called when Thymer Desktop receives:
	 *
	 *   thymer://<accountHost>/plugin-action?workspaceGuid=<workspaceGuid>&action=<actionName>&...
	 *
	 * The action object is flat. It includes rawUrl, accountHost, workspaceGuid,
	 * action, and every query parameter from the URL.
	 *
	 * @param {Record<string, string|string[]> & {rawUrl: string, accountHost: string, workspaceGuid: string, action: string}} action
	 */
	onProtocolAction(action) {
		if (action.action !== ACTION_TOAST) return;

		void this.window.show();
		void this.window.focus();

		const message = action.message || 'No message.';
		const source = action.source || 'No source.';

		this.ui.addToaster({
			title: 'Protocol action received',
			message: `${message} (${source})`,
		});
	}

	getDemoUrl() {
		const url = new URL(`thymer://${window.location.host}/plugin-action`);
		url.searchParams.set('workspaceGuid', this.getWorkspaceGuid());
		url.searchParams.set('action', ACTION_TOAST);
		url.searchParams.set('message', 'Hello from a protocol action');
		url.searchParams.set('source', 'external-url');
		return url.toString();
	}

	/****** scaffolding below ******/

	renderDemoPanel(panel) {
		const root = panel.getElement();
		if (!root) return;

		const demoUrl = this.getDemoUrl();
		root.replaceChildren();
		root.style.padding = '24px';
		root.style.overflow = 'auto';

		const container = document.createElement('div');
		container.style.maxWidth = '880px';
		container.style.display = 'flex';
		container.style.flexDirection = 'column';
		container.style.gap = '18px';

		const title = document.createElement('h1');
		title.textContent = 'Protocol Action Demo';
		title.style.margin = '0';
		container.appendChild(title);

		const intro = document.createElement('p');
		intro.textContent = 'Open this URL from any launcher or shortcut tool to send a protocol action to this loaded plugin.';
		intro.style.margin = '0';
		container.appendChild(intro);

		container.appendChild(this.createCodeBlock(demoUrl));
		container.appendChild(this.createSection('Linux', [
			`xdg-open '${demoUrl}'`,
		]));
		container.appendChild(this.createSection('macOS', [
			`open '${demoUrl}'`,
		]));
		container.appendChild(this.createSection('Windows PowerShell', [
			`Start-Process "${demoUrl}"`,
		]));
		container.appendChild(this.createSection('Windows AutoHotkey', [
			`Run "${demoUrl}"`,
		]));

		const note = document.createElement('p');
		note.textContent = 'Protocol actions are dispatched to plugins in open workspace windows only.';
		note.style.margin = '0';
		container.appendChild(note);

		root.appendChild(container);
	}

	createSection(titleText, commands) {
		const section = document.createElement('section');
		const title = document.createElement('h2');
		title.textContent = titleText;
		title.style.margin = '0 0 8px';
		section.appendChild(title);
		for (const command of commands) {
			section.appendChild(this.createCodeBlock(command));
		}
		return section;
	}

	createCodeBlock(text) {
		const pre = document.createElement('pre');
		pre.textContent = text;
		pre.style.margin = '0';
		pre.style.padding = '12px';
		pre.style.borderRadius = '6px';
		pre.style.overflowX = 'auto';
		pre.style.whiteSpace = 'pre-wrap';
		pre.style.userSelect = 'text';
		pre.style.background = 'var(--input-bg-color, rgba(127, 127, 127, 0.12))';
		return pre;
	}
}
