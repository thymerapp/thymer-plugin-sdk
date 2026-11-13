# Creating and sharing Thymer themes

> The plugin and theme SDK is in beta, so some details may change.

Themes are CSS files with a JSON manifest for installing them from a URL.

## Try an example

| Example | Appearance | Manifest | CSS |
| --- | --- | --- | --- |
| Midnight | Dark | [Manifest](midnight/thymer-theme.json) | [CSS](midnight/midnight.css) |
| Ocean | Light and dark | [Manifest](ocean/thymer-theme.json) | [Light](ocean/light.css), [Dark](ocean/dark.css) |

1. Open an example's manifest on GitHub and copy its URL from the address bar.
2. Open **Settings → Theme → Add theme → Install from URL** and paste it.
3. Choose **Load Theme**, then **Install and Use**.

For Ocean, select **Ocean Light** and **Ocean Dark** under the matching Light/Dark
choices in Settings → Theme. Choose **Auto** to follow your system appearance,
then save.

## Create a theme

Any workspace member can open **Settings → Theme → Add theme → Create a theme**.
Choose a name and Light or Dark appearance, then enter CSS and **Save and Use**.
Open the theme's **⋯ → Edit CSS** to make changes.

To share within your workspace, use **⋯ → List for everyone**. Other members can
select the theme in Settings → Theme or **Set Theme**. Your saved changes also
apply to anyone using it.

## Designing your theme

Start with Ocean's commented CSS above, or override just a few variables:

```css
html:root {
  --color-primary-500: #6085db;
  --side-bg-color: var(--color-bg-800);
}
```

New themes inherit Thymer's default Light/Dark styles. Use `html:root` so your
variables take precedence over those defaults. The entire stylesheet applies
only while your theme is selected; ordinary rules such as `.sidebar { ... }`
need no theme selector.

### Palettes and fonts

These variables set the colors and typography that components use by default.

| Customize | Variables |
| --- | --- |
| Background palette | `--color-bg-50` through `--color-bg-950`, including `150` |
| Text palette | `--color-text-50` through `--color-text-950` |
| Accent palette | `--color-primary-50` through `--color-primary-950`, `--color-primary-text-100` for text on accents |
| Fonts | `--font-sans`, `--font-mono`, `--font-weight-normal` |

### Component overrides

Most component colors follow your palette automatically. Override these variables
when you want to customize a particular component separately.

| Customize | Variables |
| --- | --- |
| Panels and sidebar | `--panel-bg-color`, `--panel-fg-color`, `--side-bg-color`, `--side-fg-color` |
| Sidebar hover | `--sidebar-bg-hover`, `--sidebar-fg-hover` |
| Text and links | `--text-default`, `--text-muted`, `--link-color`, `--link-hover-color` |
| Selection | `--selection-bg`, `--selection-fg` |
| Buttons | `--button-primary-bg-color`, `--button-primary-fg-color`, `--button-primary-bg-hover-color` |
| Primary button borders | `--button-primary-border-color`, `--button-primary-border-hover-color` |
| Inputs and focus | `--input-bg-color`, `--input-fg-color`, `--input-border`, `--input-border-focus` |
| Cards | `--cards-bg`, `--cards-fg`, `--cards-border-color`, `--cards-hover-bg` |
| Dividers | `--divider-color`, `--thin-divider-color`, `--sidebar-divider-color` |
| Rounded corners | `--radius-normal`, `--button-radius`, `--modal-radius` |

`--input-border` and `--input-border-focus` take a complete border value, such as
`1px solid var(--color-primary-500)`. Variables ending in `-color` take just a color.

## Package and publish

For a theme created in Thymer, choose **⋯ → Export**, then copy the supplied
`thymer-theme.json` and `theme.css` into files. Review the name, author, and version.

Alternatively, copy an example or write a `thymer-theme.json` beside your CSS:

```json
{
  "id": "yourname.my-theme",
  "name": "My Theme",
  "author": "Your name",
  "version": "1.0.0",
  "variants": [
    {
      "id": "my-theme-dark",
      "name": "My Theme",
      "appearance": "dark",
      "css": "theme.css"
    }
  ]
}
```

- Use your own package `id`. IDs use lowercase letters, numbers, dots, hyphens,
  or underscores, start with a letter or number, and have at most 128 characters.
- Include 1–8 variants with distinct IDs. For a Light/Dark pair, give each variant
  its own CSS file, as Ocean does. Match `appearance` to the CSS.
- The `css` entry accepts a filename, a path relative to the manifest, or a full
  HTTPS URL.
- Each variant inherits the default styles (`"base": "basic"`). Use
  `"base": "none"` to define its theme styles from scratch.
- Optional manifest entries: `description`, `homepage`, and `screenshot`.
  The latter two accept full HTTPS URLs or paths relative to the manifest.

Publish the files in a public GitHub repository. With `thymer-theme.json` at its
root, users can install using the repository URL. For a manifest in a subdirectory,
share its GitHub file URL. An HTTPS host that permits browser CORS requests also works.

Limits: 64 KB for the manifest, 256 KB of CSS per variant, 512 KB across variants.

## Publish updates

Keep the package ID, variant IDs, and manifest URL unchanged. Increase the version
(e.g. `1.0.0` → `1.0.1`) and upload the CSS files before the updated manifest.
Share a branch URL rather than a pinned commit URL so users can receive updates.

Users choose **Check for updates → Update → Update Theme** in Settings → Theme.
Updates are never installed automatically. Updating a theme listed for workspace
members also updates it for everyone using that theme.
