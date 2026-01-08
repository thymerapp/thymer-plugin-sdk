/**
 * Example "Exporter" plugin that provides flat-file workspace export functionality for debugging/testing purposes.
 * 
 * Read examples/dev-plugins/dev-cache-files/dev-cache-files.js for usage!
 */
class Plugin extends AppPlugin {

	/**
	 * @public
	 * Called when the plugin is initialized.
	 */
	onLoad() {
		const self = this;
		
		// @ts-ignore - adding to window for debugging
		window.debugContents = async () => {
			const files = await self.exportWorkspaceAsMarkdown();
			return {
				files: files ?? []
			};
		};
	}

	/**
	 * @public
	 * Called when the plugin is unloaded.
	 */
	onUnload() {
		// @ts-ignore
		if (window.debugContents) {
			// @ts-ignore
			delete window.debugContents;
		}
	}

	/**
	 * Export all records in the workspace as markdown files.
	 * 
	 * @returns {Promise<Array<{filename: string, content: string}>|null>}
	 */
	async exportWorkspaceAsMarkdown() {
		/** @type {{filename: string, content: string}[]} */
		const files = [];

		const collections = await this.data.getAllCollections();

		for (const collection of collections) {
			const records = await collection.getAllRecords();

			for (const record of records) {
				const result = await record.getAsMarkdown({experimental: true});
				if (result === null) continue;

				files.push({
					filename: result.filename,
					content: result.content
				});
			}
		}

		return files;
	}
}