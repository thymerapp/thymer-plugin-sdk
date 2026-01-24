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
