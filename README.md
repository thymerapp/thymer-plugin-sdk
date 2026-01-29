# Thymer Plugin SDK

## Introduction

See the [Plugins](https://thymer.com/plugins/) page on the [Thymer](https://thymer.com) website for a general introduction to Thymer plugins. The plugins page includes **screenshots** and **demo videos** of the examples (which you'll find in the _examples_ directory).


## Plugin SDK

This repository contains a minimal starter kit showing how to develop, hot-reload, and debug a Thymer Plugin with **Chrome DevTools Protocol** (no local HTTPS server required).

```
thymer-plugin-dev
├─ plugin.js                 # your plugin code (edit this file)
├─ plugin.json               # your plugin conf (edit this file)
├─ dev.js                    # build & push script; run 'npm run dev'
├─ types.d.ts                # API Documentation
├── examples/                # Example plugins
│   ├── app-plugins/         # Global app plugin examples
│   └── collection-plugins/  # Collection plugin examples
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

If you've created a new Global Plugin in step 3 to give it a quick test, simply uncomment the _export class Plugin extends AppPlugin_ example in plugin.js and save.

The development loop started in step 4 watches your plugin files for changes. When you save changes to plugin.js or plugin.json:

1. The code is bundled into dist/plugin.js with inline sourcemaps for debugging
2. The bundle is automatically pushed to Chrome via the debugger connection
3. Thymer detects the changes and hot-reloads your plugin with the updates

This allows you to rapidly iterate and test changes without saving to your workspace. Once you're satisfied with the changes, you can save them permanently.

### 6 · Production build

Finished developing?

```bash
npm run build    # emits dist/plugin.js
```

Copy the contents of `dist/plugin.js` in your plugin's Edit Code > Custom Code dialog.
Copy the contents of `plugin.json` in your plugin's Edit Code > Configuration dialog.

---

## Tips

### Adding properties and views

For Collection Plugins, the list of custom properties and views (their name, icon, types, order and other settings) can be found in `plugin.json`. Behavior for those properties and views (like render hooks, defining custom view types, writing formulas) can then be added in `plugin.js`.

### Modifying plugins without build step

Of course you can also simply write your JS and JSON directly int othe Edit Code dialog and skip all the steps above. That's typically what you want when making quick changes like adding a formula to one of your collection properties. For example, adding a Total column to your database table view which shows the value of Hours * Amount:

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

This should work great for CSS, small images, and so on. As the plugins become part of your workspace data, we recommend hosting large assets externally.


---

### Troubleshooting and gotcha's

- Your plugin code is stored in your Workspace data and needs to be downloaded, so make sure the asset bundle isn't too big.
- We use localStorage for Hot Reloading, which adds an additional size limit of a few MB.
- Consider using external URLs/fetch/import to import large dependencies or assets.
- If you're writing/pasting code directly into the Edit Code dialog in Thymer, make sure not to include and _export_ or _import_ keywords. They only work in the development set up and are removed by the build step. Only use `export class Plugin` when using the Hot Reload + dev build loop (`npm run dev`) to develop plugins in your own editor. This way you can work on larger plugin projects with multiple files, imports, assets and so on and build them into a single plugin.js dist file for distribution. If you're pasting and editing plain plugin.js JavaScript code directly into the Custom Code field in the Thymer UI, leave out `export` and `import` statements, and just use `class Plugin ....` instead.


### Using the Examples

You can find several examples of app plugins and collection plugins in the examples directory.

To test any of the examples, follow the Quick Start instructions above and copy its `.js` contents into `plugin.js`, and its `.json` contents into `plugin.json`.

Copy-pasting the examples directly into the _Edit Code_ dialog in Thymer only works if they don't use any assets/`import`s, and the `export` keyword is removed. Otherwise you need to use the build step first as described in Quick Start step 6.

### API

Review the types.d.ts file for complete API documentation. This should also provide autocomplete in most IDEs.

## Support

The Plugin SDK is currently in beta and actively being developed, breaking changes are very likely to happen. 

We'd love to get your feedback and suggestions for improvements, please let us know what features you'd like to see or any problems you encounter. 

Join the Thymer community to participate in discussions and get support.

---

Happy hacking! 🛠️
