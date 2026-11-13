# Thymer Plugin SDK

## Introduction

See the [Plugins](https://thymer.com/plugins/) page on the [Thymer](https://thymer.com) website for a general introduction to Thymer plugins. The plugins page includes **screenshots** and **demo videos** of the examples (which you'll find in the _examples_ directory).

To try an example, start with the [examples guide](examples/README.md). It lists plugins you can install from a URL and examples that need a build first. The SDK also includes [theme examples and a guide](examples/themes/README.md) for installing, publishing, and updating CSS themes, including a package with both light and dark variants.


## Plugin SDK

This repository contains a starter kit for developing, hot-reloading, and debugging Thymer plugins.

```
thymer-plugin-dev
├─ plugin.js                 # your plugin code (edit this file)
├─ plugin.json               # your plugin conf (edit this file)
├─ dev.js                    # build & push script; run 'npm run dev'
├─ types.d.ts                # API Documentation
├── examples/                # Example plugins and themes
│   ├── app-plugins/         # Global app plugin examples
│   ├── collection-plugins/  # Collection plugin examples
│   └── themes/              # Theme manifest and CSS example
└── dist/                    # Built plugin output
```


## 🔌 Plugin Types

### App Plugins (Global)
App plugins extend the entire Thymer application with global functionality, for example:

- **Status bar items** - Display information in the app's status bar
- **Sidebar items** - Add navigation items to the sidebar
- **Command palette commands** - Add custom commands
- **Custom panels** - Create new panel types
- **Toaster notifications** - Show user notifications

### Collection Plugins
Collection plugins extend a specific note Collection, for example:

- **Base view hooks** - Overrides/render hooks for table, boards, gallery and calendar views
- **Custom views** - Create custom view types
- **Custom properties** - New data fields with custom rendering
- **Navigation buttons** - Collection-specific actions
- **Formulas** - Computed properties
- **Filters and sorting** - Custom data organization

---

## Quick Start

This guide shows how to get started with plugin development using your favorite code IDE and Hot Reload in Thymer:

### 1 · Clone & install

```bash
git clone https://github.com/thymerapp/thymer-plugin-sdk.git
cd thymer-plugin-sdk
npm install
```
---

### 2 · Start Chrome with debugging port

```bash
chrome --remote-debugging-port=9222 --no-first-run https://myaccount.thymer.com
```

or on macOS:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-debug-profile" --no-first-run https://myaccount.thymer.com
```

*Edge Chromium works too.*

---

### 3 · Enable Hot Reload in Thymer

- Open Thymer running in your debugging Chrome Window from the step above.
- Press Cmd+P/Ctrl+P to bring up the Command Palette, select "Plugins".
- Find your Global/Collection Plugin. To get started with a quick test, click "Create Plugin" to create a test Global Plugin.
- In the Code Editor dialog, select the "Developer Tools" tab.
- Click "Enable Plugin Hot Reload"

### 4 · Start the dev loop

```bash
npm run dev
```

or, with verbose output (shows the code being pushed):

```bash
npm run dev:verbose
```

### 5 · Start developing 

Start developing your plugin in `plugin.js` and `plugin.json`.

The starter `plugin.js` already exports an `AppPlugin` example for a Global Plugin. For a Collection Plugin, use the `CollectionPlugin` example in its comments instead.

When you save `plugin.js` or `plugin.json`, the SDK rebuilds your plugin and reloads it in Thymer. These changes are temporary until you save them in Thymer's source editor.

### 6 · Production build

Finished developing? Run:

```bash
npm run build    # emits dist/plugin.js
```

Copy the contents of `dist/plugin.js` into your plugin's source editor in the Thymer app under **Custom Code**, and `plugin.json` under **Configuration**, then **Preview → Save**. 

The build emits JavaScript only; include your plugin configuration separately.

Instead of copy-pasting, you can also let others install the plugin from a URL, by publishing these files with a `thymer-plugin.json` as described below. 

---

## Sharing a plugin for installation from a URL

To let others install your plugin from a URL, publish a `thymer-plugin.json` manifest alongside your plugin files. The manifest describes the package; `plugin.json` holds the plugin's configuration.

```json
{
  "id": "example.task-timer",
  "name": "Task Timer",
  "author": "Example",
  "version": "1.0.0",
  "type": "global",
  "description": "Track time on tasks",
  "homepage": "https://example.com/task-timer",
  "screenshot": "screenshot.png",
  "files": {
    "config": "plugin.json",
    "js": "plugin.js",
    "css": "plugin.css"
  }
}
```

The required manifest entries are:

| Entry | What to use |
| --- | --- |
| `id` | A stable ID such as `yourname.task-timer`, using lowercase letters, numbers, dots, hyphens, or underscores. |
| `name`, `author` | Your plugin's name and your name. |
| `version` | Your plugin's release number, such as `1.2.3`. Use three numbers, without prerelease or build suffixes. Increase this when publishing an update. |
| `type` | `"global"` or `"collection"`. |
| `files` | The plugin files, as described below. A `config` entry is required. |

The optional `description`, `homepage`, and `screenshot` entries let you add a summary, a link to learn more, and an image path or URL.

### Preparing the files

For the example manifest above, publish this layout:

```text
thymer-plugin.json
plugin.json
plugin.js           # optional
plugin.css          # optional
screenshot.png      # optional
```

In the manifest's `files` section:

| Entry | File |
| --- | --- |
| `config` (required) | Your plugin configuration file, usually `plugin.json`. |
| `js` (optional) | Your JavaScript file, usually `plugin.js`. |
| `css` (optional) | Your separate stylesheet, usually `plugin.css`. Omit this if your JavaScript already injects the CSS. |

Other filenames work too. Use filenames for files beside the manifest, paths such as `dist/plugin.js` for subdirectories, or full HTTPS URLs. Leave out entries for files you do not publish, including `screenshot` if you have no image.

JavaScript is optional: for example, a collection can define fields and views using configuration alone. When providing JavaScript, use a standalone `Plugin` class extending `AppPlugin` or `CollectionPlugin`, or the SDK's build output. If your source imports modules or assets, run `npm run build` first. You can publish the resulting `dist/plugin.js` as `plugin.js`, or keep it in `dist` and set the manifest's `js` entry accordingly. Thymer does not build source files during installation.

Publish configuration defaults without personal settings or API keys. Use an object for `custom` (such as `{}`), and unique IDs for fields and views.

The combined JavaScript, CSS, and configuration limit is **5 MiB**; CSS and configuration are each limited to **1 MiB**. The manifest limit is **256 KiB**.

### Installing the published package

Publish the files in a public GitHub repository or on an HTTPS host that allows browser cross-origin requests (CORS). Share one of these URLs:

- A public GitHub repository URL, such as `https://github.com/author/plugin`. Thymer finds `thymer-plugin.json` at the repository root on its default branch.
- The manifest file's GitHub URL, copied from your address bar. Use this for a manifest in a subdirectory, as in the SDK examples.
- A direct HTTPS URL to the manifest. GitHub **Raw** links work too.

To install:

1. As a workspace administrator, open **Plugins → Add plugin → Install from URL** and paste the URL.
2. Choose **Load Plugin**, review the package, then choose **Open Draft**.
3. Choose **Preview** to run the plugin, then **Save** to keep it or **Discard** to remove the draft.

Installation creates a new global plugin or collection. It does not modify an existing collection.

Existing repositories without a manifest can also be installed if their root contains `plugin.json` and ready-to-run `plugin.js`, with an optional `plugin.css`. To support updates, publish a `thymer-plugin.json` manifest.

### Publishing a new version

1. Test the changes and build your JavaScript if needed.
2. Publish the changed files and increase the manifest's `version`, for example from `1.0.0` to `1.0.1`. Increase it for CSS and configuration changes too.
3. Keep the plugin `id` and `type` unchanged. Keep field and view IDs stable so users retain their local configuration when updating.

The `id` identifies your plugin; the manifest URL tells Thymer where to find updates. Thymer checks the URL used to install the plugin, so keep that address available for future releases. If it stops working, installed plugins keep working, but update checks fail.

### Updating installed plugins

Choose **Plugins → Check for updates** to check global and collection plugins installed using a manifest. When a newer release is available, choose **Update**, review it, then **Open Draft → Preview → Save**. Updates are never installed automatically. Plugins installed without a manifest or created by manually pasting source are not included in update checks.

Thymer warns before replacing locally edited JavaScript or CSS and preserves local configuration where possible. Collection records are not replaced by an update. **Discard** restores the installed source and configuration.

**Preview runs the plugin's code.** Discarding a draft cannot undo workspace changes made by that code.

## Tips

### Adding properties and views

For Collection Plugins, the list of custom properties and views (their name, icon, types, order and other settings) can be found in `plugin.json`. Behavior for those properties and views (like render hooks, defining custom view types, writing formulas) can then be added in `plugin.js`.

### Modifying plugins without build step

Of course you can also simply write your JS and JSON directly into the Edit Code dialog and skip all the steps above. That's typically what you want when making quick changes like adding a formula to one of your collection properties. For example, adding a Total column to your database table view which shows the value of Hours * Amount:

```js
class Plugin extends CollectionPlugin {

   onLoad() {
     this.properties.formula("Total", ({record}) => {
         const quantity = record.number("Hours");
         const unitPrice = record.number("Amount");
         if (quantity == null || unitPrice == null) return null;
         return quantity * unitPrice;
     });
   }

}
```



### Bundling assets

When using the development environment as described in ***Quick Start***, you can bundle small assets along by simply importing them:

| Type | How to import | Usage |
|------|---------------|----------------|
| **CSS** | `import css  from './styles.css';` | bundled as plain text → `this.ui.injectCSS(css)` |
| **PNG / SVG / JPG** | `import icon from './icon.png';` | data URL, e.g. `background: url(${icon})` |

Bundle small assets and host large ones externally. For images, fonts, or files loaded directly by your CSS or JavaScript, use full HTTPS URLs. Relative URLs inside those files do not automatically refer to your GitHub repository.


---

### Troubleshooting

- Your plugin code is stored in your Workspace data and needs to be downloaded, so make sure the asset bundle isn't too big.
- We use localStorage for Hot Reloading, which adds an additional size limit of a few MB.
- Consider using external URLs/fetch/import to import large dependencies or assets.
- If you're writing/pasting code directly into the Edit Code dialog in Thymer, make sure not to include and _export_ or _import_ keywords. They only work in the development set up and are removed by the build step. Only use `export class Plugin` when using the Hot Reload + dev build loop (`npm run dev`) to develop plugins in your own editor. This way you can work on larger plugin projects with multiple files, imports, assets and so on and build them into a single plugin.js dist file for distribution. If you're pasting and editing plain plugin.js JavaScript code directly into the Custom Code field in the Thymer UI, leave out `export` and `import` statements, and just use `class Plugin ....` instead.


### Using the Examples

The [examples guide](examples/README.md) lists plugins you can install from a URL, examples that need a build, and light/dark theme examples. Follow each example's instructions to try it or use it as a starting point.

### API

Review the types.d.ts file for complete API documentation. This should also provide autocomplete in most IDEs.

## Support

The Plugin SDK is currently in beta and actively being developed.

We'd love to get your feedback and suggestions for improvements, please let us know what features you'd like to see or any problems you encounter. 

Join the Thymer community to participate in discussions and get support.

---

Happy hacking! 🛠️
