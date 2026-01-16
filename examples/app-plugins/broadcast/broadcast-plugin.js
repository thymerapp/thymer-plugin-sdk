/**
 * Broadcast Demo Plugin
 * 
 * Demonstrates the WebSocket API for real-time messaging between users.
 * 
 * Features:
 * - Adds a "Say Hello" button to the status bar
 * - When clicked, broadcasts a message to all other users in the workspace
 * - When a message is received from another user, shows a toaster notification
 * 
 * This is fire-and-forget messaging: no delivery guarantees, and offline
 * users won't receive messages.
 */

class Plugin extends AppPlugin {
	
	onLoad() {
		this.addBroadcastButton();
		this.listenForMessages();
	}

	addBroadcastButton() {
		this.ui.addStatusBarItem({
			label: "Say Hello",
			icon: "broadcast",
			tooltip: "Send a hello message to all other users",
			onClick: () => {
				this.ws.broadcast({
					type: "hello",
					data: { text: "Hello everyone!" }
				});
				this.ui.addToaster({ message: "Message sent!" });
			}
		});
	}

	listenForMessages() {
		this.ws.onMessage((msg) => {
			// Only handle messages from this plugin
			if (msg.fromPluginGuid !== this.getGuid()) return;
			
			if (msg.type === "hello") {
				this.ui.addToaster({
					title: "Message received",
					message: msg.data?.text || "Hello!"
				});
			}
		});
	}

	onUnload() {
		// Cleanup is automatic for ws.onMessage listeners
	}
}
