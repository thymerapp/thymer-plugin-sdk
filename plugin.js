/**
 * AppPlugin is for plugins that don't belong to a collection, like a status bar item or a toolbar item.
 * CollectionPlugin is for plugins that belong to a collection, like a custom view or a custom property.
 * 
 * Extend from one of the two classes.
 * 
 * class Plugin extends AppPlugin {
 * 	
 *    onLoad() {
 *       this.ui.addToaster({
 *          title: "Hello World",
 *          message: "This is a test",
 *          dismissible: true,
 *          autoDestroyTime: 3000,
 *       })
 *    }
 * 
 * }
 * 
 * or:
 * 
 * class Plugin extends CollectionPlugin {
 * 	
 *    onLoad() {
 *       this.ui.addToaster({
 *          title: "Hello World",
 *          message: "This is a test",
 *          dismissible: true,
 *          autoDestroyTime: 3000,
 *       })
 *    }
 * 	 
 * }
 * 
 * Define your plugin's configuration in plugin.json.
*/

// NOTE: use 'export class Plugin' when using the Hot Reload + dev build loop ('npm run dev') to develop plugins in
// your own editor. This way you can work on larger plugin projects with multiple files, imports, assets and so on 
// and build them into a single plugin.js dist file.
//
// If you're pasting and editing plain plugin.js JavaScript code directly into the Custom Code field in the Thymer UI,
// leave out 'export' and 'import' statements, and just use 'class Plugin ....' instead.

class Plugin extends AppPlugin {
    onLoad() {
		this.ui.addToaster({
			title: "Hello World",
			message: "This is a test",
			dismissible: true,
			autoDestroyTime: 3000,
		})
    }
}
