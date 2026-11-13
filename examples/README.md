# Plugin and theme examples

These examples cover global app plugins, collection plugins, themes, and developer tools. For API details and the development setup, see the [SDK guide](../README.md).

## Install a ready-to-run example

The examples below include `thymer-plugin.json` with their name, author, version, plugin type, and source file paths. You can install them from a URL or use manual source editing and Hot Reload.

1. Open the example's **Manifest** link below on GitHub and copy the URL from your address bar.
2. As a workspace administrator, open Thymer's **Plugins** panel from the Command Palette and choose **Add plugin → Install from URL**.
3. Paste the URL and click **Load Plugin**. Review the package, then choose **Open Draft → Preview → Save**. Preview runs the code; Discard removes the new draft.
4. Try the action listed below. A collection example creates a new collection; add your own sample records to it.

Use the manifest's GitHub file URL or Raw URL for these examples. The SDK repository contains multiple plugins in subdirectories, so pasting just the SDK repository URL will not select an example.

| Example | Type | Manifest | Try it after installing |
| --- | --- | --- | --- |
| Broadcast Demo | Global | [Manifest](app-plugins/broadcast/thymer-plugin.json) | Click **Say Hello** in the status bar with another workspace user online to receive the message. |
| Clock | Global | [Manifest](app-plugins/clock/thymer-plugin.json) | Watch the live clock in the status bar. |
| Move Completed Tasks | Global | [Manifest](app-plugins/move-completed-tasks/thymer-plugin.json) | Open a page with checked and unchecked tasks, then run **Move completed tasks down** from the Command Palette. |
| Navigate to Journal | Global | [Manifest](app-plugins/navigate-to-journal/thymer-plugin.json) | In a workspace with a Journal, click the calendar status button. The demo adds a task to next week's journal and opens it. |
| Protocol Action Demo | Global | [Manifest](app-plugins/protocol-action/thymer-plugin.json) | Click **Protocol demo** in the status bar and open the generated `thymer://` link in Thymer Desktop to see a toast. |
| Pac-Man Cursor | Global | [Manifest](app-plugins/robot-cursor/thymer-plugin.json) | Type in a page to see the animated cursor. This installs the bundled Pac-Man variant, named **Cursor Fun Demo**. |
| Sci-fi Vibe | Global | [Manifest](app-plugins/vibe-scifi/thymer-plugin.json) | Choose **Sci-fi Opening Crawl** in the vibe picker for Focus Mode. |
| Sidebar Widget (Sloppy) | Global | [Manifest](app-plugins/sidebar-widget/thymer-plugin.json) | Move your cursor to make the sidebar character look around, then complete tasks to see its celebrations. |
| Weather | Global | [Manifest](app-plugins/weather/thymer-plugin.json) | See Amsterdam's weather in the status bar; click it to refresh. Fetches data from Open-Meteo at runtime. |
| Word Count | Global | [Manifest](app-plugins/word-count/thymer-plugin.json) | Open a page and type to see word and line counts in the status bar. |
| WPM Cursor | Global | [Manifest](app-plugins/wpm-cursor/thymer-plugin.json) | Type in a page to see your typing speed next to the cursor. |
| Automatic Values | Collection | [Manifest](collection-plugins/auto-values/thymer-plugin.json) | Create an invoice to get **Pending** status, then set it to **Paid** to fill **Paid at**. |
| Custom Property Rendering | Collection | [Manifest](collection-plugins/custom-prop-render/thymer-plugin.json) | Add projects with **Difficulty** values from 0–100 to see colored bars in the table. |
| Filter Dropdown Choices | Collection | [Manifest](collection-plugins/filter-dropdown-choices/thymer-plugin.json) | In the new **Workboard** collection, create a record and choose its **Type**. Its **Status** dropdown shows the matching choices. |
| Kanban Card Button | Collection | [Manifest](collection-plugins/kanban-card-button/thymer-plugin.json) | Add a record with **In Progress** status, open the board, and click **Mark Completed** on its card. |
| Kanban Dependencies | Collection | [Manifest](collection-plugins/kanban-dependencies/thymer-plugin.json) | Link cards using **Depends on** and open the board to see indicators for unfinished dependencies. |
| Kanban WIP Limits | Collection | [Manifest](collection-plugins/kanban-wip/thymer-plugin.json) | Add more than three cards to a board column to highlight its exceeded limit. |
| Organization Chart | Collection | [Manifest](collection-plugins/org-chart/thymer-plugin.json) | Add people with their manager's name in **Manager**, then open the custom chart view. |
| Live Property Values | Collection | [Manifest](collection-plugins/real-time-property/thymer-plugin.json) | Add records to see simulated live resource usage in the **Utilization** column. |
| Simple List View | Collection | [Manifest](collection-plugins/simple-list-view/thymer-plugin.json) | Add notes and open **My View** to try the custom list and keyboard navigation. |
| Custom Table Sort | Collection | [Manifest](collection-plugins/table-custom-sort/thymer-plugin.json) | Enter full names in **Customer Name**, then sort the column by last name. |
| Table ID Constraint | Collection | [Manifest](collection-plugins/table-id-constraint/thymer-plugin.json) | Enter a **Project Code** without the `PROJECT-` prefix to see its validation styling. |
| Workspace Exporter | Global + local tool | [Manifest](dev-plugins/dev-cache-files/thymer-plugin.json) | Follow the [exporter setup](#workspace-exporter) below to write local Markdown files. |

You can still try these examples manually: create a Global Plugin or a new collection, then open its source editor. Look in the manifest's `files` section: paste the contents of the file listed under `config` into **Configuration** and the file listed under `js` into **Custom Code**, then **Preview → Save**. Paste the runtime configuration, not `thymer-plugin.json`. Manual copies do not have an install URL and are not included in update checks.

Self-contained examples can keep `export class Plugin extends AppPlugin` or `export class Plugin extends CollectionPlugin`: Thymer's loader accepts these declarations. They do not need a build just because they use `export`.

For examples installed from a URL, **Plugins → Check for updates** checks both global and collection plugins. A newer published version adds an **Update** action to the tile. Updates use the same review and **Open Draft → Preview → Save** flow, with a warning before replacing locally edited JavaScript or CSS. See [how updates work](../README.md#updating-installed-plugins).

## Theme examples

These examples need no JavaScript or build step:

| Example | Appearance | Manifest | CSS |
| --- | --- | --- | --- |
| Midnight | Dark | [Manifest](themes/midnight/thymer-theme.json) | [Midnight](themes/midnight/midnight.css) |
| Ocean | Light and dark | [Manifest](themes/ocean/thymer-theme.json) | [Light](themes/ocean/light.css), [Dark](themes/ocean/dark.css) |

Open the manifest on GitHub, copy its URL, and paste it into
**Settings → Theme → Add theme → Install from URL**. Load the theme,
then choose **Install and Use**.

For Ocean, select **Ocean Light** under **Light theme** and **Ocean Dark** under
**Dark theme**, then save. Choose **Auto** appearance to follow your system's
light/dark setting using that pair.

The [theme guide](themes/README.md) explains how to publish those files in your
own repository, choose manifest fields, and release updates.
For palettes, fonts, and component overrides, start with Ocean's commented CSS
and [Designing your theme](themes/README.md#designing-your-theme).

## Build the source examples

The sources below import JavaScript modules, CSS, or images and need bundling before installation. They intentionally have no install manifest pointing at those source files. Thymer does not run the SDK build during installation. The Pac-Man example already has a manifest pointing at its included bundle.

Use a fresh SDK checkout for experimenting. From its root, copy one example's entry file to `plugin.js` and its configuration to `plugin.json`. Copy any listed assets alongside them, keeping the imported filenames. For example, to build the CSS imports demo:

```bash
cp examples/app-plugins/css/css-plugin.js plugin.js
cp examples/app-plugins/css/css-plugin.json plugin.json
cp examples/app-plugins/css/styles.css styles.css
npm install
npm run build
```

Create a Global Plugin or a new collection in Thymer to match the example type. In its source editor, paste `dist/plugin.js` into **Custom Code** and `plugin.json` into **Configuration**, then **Preview → Save**. Collection examples need sample records; their source comments describe the setup. For live development, use the SDK's [Hot Reload setup](../README.md#quick-start) and `npm run dev` instead.

All filenames below are relative to the linked example directory.

| Example | Type | Copy to `plugin.js` | Copy to `plugin.json` | Extra files to copy |
| --- | --- | --- | --- | --- |
| [CSS imports](app-plugins/css/) | Global | `css-plugin.js` | `css-plugin.json` | `styles.css` |
| [Robot cursor](app-plugins/robot-cursor/) | Global | `robot-cursor-plugin.js` | `robot-cursor-plugin.json` | `walker-8f2.png` |
| [Pac-Man cursor source](app-plugins/robot-cursor/) | Global | `pacman-cursor-plugin.js` | `robot-cursor-plugin.json` | `pacman-8f2.png` |
| [Globe view](collection-plugins/globe-view/) | Collection | `globe-plugin.js` | `globe-plugin.json` | `globe.js`, `earth_atmos_4096.avif`; also loads remote resources at runtime |

Pac-Man already includes a built `pacman-cursor-plugin-dist.js`, so you can install it using the manifest above without building. Its sibling robot source is a separate variant that needs a build.

To develop one of the ready-to-run examples using the SDK, copy the script and configuration named in its manifest to the SDK root as `plugin.js` and `plugin.json`. Keep an existing `export class Plugin` declaration; if it uses plain `class Plugin`, add `export` in that development copy so the SDK build exposes the class. For Pac-Man, use the source and image listed above instead of the existing bundle.

### Distributing a built example

Follow [Sharing a plugin for installation from a URL](../README.md#sharing-a-plugin-for-installation-from-a-url). Publish the generated `dist/plugin.js` and runtime `plugin.json`, and add a `thymer-plugin.json` referencing those files with the correct plugin type. Use your own plugin ID and author when distributing a modified example.

For the Globe example, change `"custom": null` to `"custom": {}` in the configuration you publish; the URL installer expects an object for custom settings. Also check the bundle size against the installer's 5 MiB total limit for JavaScript, CSS, and configuration (CSS and configuration are each limited to 1 MiB). Use `npm run build` to omit development source maps. Large embedded assets may need to be hosted separately.

## Workspace exporter

The [dev-cache-files](dev-plugins/dev-cache-files/) example has two parts:

- `export-plugin.js` runs inside Thymer. The manifest installs this part as **Demo Exporter Plugin**.
- `dev-cache-files.js` runs locally with Node and connects to Chrome's debugger. It is not plugin source and is not downloaded by the installer.

To try the complete example:

1. Clone the SDK and run `npm install`, then start Chrome with a debugging port as described in [Quick Start](../README.md#quick-start).
2. In that browser, install and save the exporter plugin using its manifest above. Hot Reload is not needed to run the exporter.
3. From the SDK root, run `npm run dev:cache-files`.
4. Open `cache/*.md` to see the exported notes. Run the command again to refresh the files.

This is a debugging demo with a partial export, not a workspace backup. See the comments in [the local script](dev-plugins/dev-cache-files/dev-cache-files.js) for limitations and the optional Claude Code example.
