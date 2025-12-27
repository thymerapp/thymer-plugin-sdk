declare global {
class AppPlugin {

    /**
     * @public
     * Get the plugin's configuration.
     *
     * @returns {PluginConfiguration}
     */
    public getConfiguration(): PluginConfiguration;

    /**
     * @public
     * Get the plugin's GUID. Unique in this workspace.
     *
     * @returns {string}
     */
    public getGuid(): string;
    /**
     * @public
     * Get the workspace GUID.
     *
     * @returns {string}
     */
    public getWorkspaceGuid(): string;
    /**
     * @public
     *
     * This is called when the plugin is initialized.
     */
    public onLoad(): void;
    /**
     * @public
     *
     * This is called when the plugin is unloaded.
     */
    public onUnload(): void;
    /**
     * @public
     * Functions to interact with the UI.
     */
    public ui: UIAPI;
    /**
     * @public
     * Functions to interact with data.
     */
    public data: DataAPI;

}

const COLLECTION_PRIMARY_ACTION_FIRST: "first";

/**
 * @typedef {Object} CollectionView
 * @property {string} id - some unique ID (within this Plugin)
 * @property {string} label
 * @property {string} description
 * @property {CollectionViewType} type
 * @property {string} icon
 * @property {boolean} shown - set to false to "delete"/"archive" a property while keeping all its data
 * @property {boolean} read_only
 * @property {string?} sort_field_id
 * @property {PluginSortDir} sort_dir - see SortDir
 * @property {string?} group_by_field_id
 * @property {string[]} field_ids - list of field ids (from PluginConfiguration.fields) we want to show in this view
 * @property {string} [query] - search query for this view
 * @property {string} [invalid_query] - the (syntax)error message for the query
 * @property {string} [single_record_guid] - for use with COLLECTION_VIEW_SINGLE_RECORD
 * @property {Object<string, any>} [opts] - view-specific options
 */
const COLLECTION_PRIMARY_ACTION_OVERVIEW: "overview";

const COLLECTION_PRIMARY_ACTION_RECORD: "record";

const COLLECTION_VIEW_BOARD: "board";

const COLLECTION_VIEW_CALENDAR: "calendar";

const COLLECTION_VIEW_CUSTOM: "custom";

const COLLECTION_VIEW_GALLERY: "gallery";

const COLLECTION_VIEW_SINGLE_RECORD: "record";

const COLLECTION_VIEW_TABLE: "table";

class CollectionPlugin {

    /**
     * @public
     * Get the plugin's configuration.
     *
     * @returns {PluginConfiguration}
     */
    public getConfiguration(): PluginConfiguration;
    /**
     * @public
     * Get the name of the collection
     *
     * @returns {string}
     */
    public getName(): string;
    /**
     * @public
     *
     * Adds a navigation button to the collection's panel navigation bar
     * @param {Object} options Navigation button options
     * @param {string} [options.label] Text label to display in the navigation button
     * @param {string} [options.htmlLabel] If non-null, render this HTML as-is instead of the text label
     * @param {IconName} [options.icon] Icon class name (e.g. "ti-bug")
     * @param {string} [options.tooltip] Tooltip text shown on hover
     * @param {boolean} [options.onlyWhenExpanded] Whether to only show this button when the navigation bar is expanded
     * @param {({ev, record, panel, element, button}: {ev: Event, record: PluginRecord?, panel: PluginPanel, element: HTMLElement, button: PluginNavigationButton}) => void} [options.onClick] Click handler function
     * @returns {PluginNavigationButton} The created navigation button
     */
    public addCollectionNavigationButton({ label, htmlLabel, icon, tooltip, onlyWhenExpanded, onClick }: {
        label?: string;
        htmlLabel?: string;
        icon?: IconName;
        tooltip?: string;
        onlyWhenExpanded?: boolean;
        onClick?: ({ ev, record, panel, element, button }: {
            ev: Event;
            record: PluginRecord | null;
            panel: PluginPanel;
            element: HTMLElement;
            button: PluginNavigationButton;
        }) => void;
    }): PluginNavigationButton;
    /**
     * @public
     *
     * This is called when the plugin is initialized.
     */
    public onLoad(): void;
    /**
     * @public
     *
     * This is called when the plugin is unloaded.
     */
    public onUnload(): void;
    /**
     * @public
     * Functions to interact with the properties.
     */
    public properties: PropertiesAPI;
    /**
     * @public
     * Functions to interact with the views.
     */
    public views: ViewsAPI;
    /**
     * @public
     * Functions to interact with the UI.
     */
    public ui: UIAPI;
    /**
     * @public
     * Functions to interact with data.
     */
    public data: DataAPI;

}

type CollectionPrimaryAction = "overview" | "record" | "first";

type CollectionView = {
    /**
     * - some unique ID (within this Plugin)
     */
    id: string;
    label: string;
    description: string;
    type: CollectionViewType;
    icon: string;
    /**
     * - set to false to "delete"/"archive" a property while keeping all its data
     */
    shown: boolean;
    read_only: boolean;
    sort_field_id: string | null;
    /**
     * - see SortDir
     */
    sort_dir: PluginSortDir;
    group_by_field_id: string | null;
    /**
     * - list of field ids (from PluginConfiguration.fields) we want to show in this view
     */
    field_ids: string[];
    /**
     * - search query for this view
     */
    query?: string;
    /**
     * - the (syntax)error message for the query
     */
    invalid_query?: string;
    /**
     * - for use with COLLECTION_VIEW_SINGLE_RECORD
     */
    single_record_guid?: string;
    /**
     * - view-specific options
     */
    opts?: {
        [x: string]: any;
    };
};

type CollectionViewType = "table" | "board" | "gallery" | "calendar" | "record" | "custom";

class DataAPI {


    /**
     * @public
     * Get all records in this workspace
     *
     * @returns {PluginRecord[]}
     */
    public getAllRecords(): PluginRecord[];
    /**
     * @public
     * Create a new record
     *
     * @param {string} title
     * @returns {string?} - guid of new record
     */
    public createNewRecord(title: string): string | null;
    /**
     * @public
     * Get a record by its GUID
     *
     * @param {string} guid
     * @returns {PluginRecord?}
     */
    public getRecord(guid: string): PluginRecord | null;
    /**
     * @public
     * Get all collections in this workspace
     *
     * @returns {Promise<PluginCollectionAPI[]>}
     */
    public getAllCollections(): Promise<PluginCollectionAPI[]>;
    /**
     * @public
     * Get all global plugins in this workspace
     *
     * @returns {Promise<PluginGlobalPluginAPI[]>}
     */
    public getAllGlobalPlugins(): Promise<PluginGlobalPluginAPI[]>;
    /**
     * @public
     * Create a new global plugin
     *
     * @returns {Promise<PluginGlobalPluginAPI|null>}
     */
    public createGlobalPlugin(): Promise<PluginGlobalPluginAPI | null>;
    /**
     * @public
     * Get a plugin by its GUID
     *
     * @param {string} guid
     * @returns {PluginGlobalPluginAPI|PluginCollectionAPI|null}
     */
    public getPluginByGuid(guid: string): PluginGlobalPluginAPI | PluginCollectionAPI | null;
    /**
     * @public
     * Get all active users in this workspace
     *
     * @returns {PluginUser[]}
     */
    public getActiveUsers(): PluginUser[];
}

/** @type {EnumColors} */
const ENUM_COLORS: EnumColors;

type EnumColors = {
    red: "0";
    orange: "1";
    green: "2";
    cyan: "3";
    blue: "4";
    purple: "5";
    pink: "6";
    fuchsia: "7";
    rose: "8";
    stone: "9";
    teal: "10";
    sky: "11";
    indigo: "12";
    zinc: "13";
};

namespace ExampleConfigurationJSON {
    let name: string;
    let icon: string;
    let description: string;
    let item_name: string;
    let ver: number;
    let show_sidebar_items: boolean;
    let show_cmdpal_items: boolean;
    let home: boolean;
    export namespace default_banner {
        let guid: string;
        let name_1: string;
            { name_1 as name };
        let imgData: string;
        let imgClass: string;
        let imgUrl: any;
        let error: string;
    }
    export namespace sidebar_action {
        let guid_1: any;
            { guid_1 as guid };
        let action: string;
    }
    export namespace managed {
        let fields: boolean;
        let views: boolean;
        let sidebar: boolean;
    }
    let page_field_ids: string[];
    let sidebar_record_sort_field_id: string;
    let sidebar_record_sort_dir: string;
    let fields_1: ({
        id: string;
        label: string;
        type: string;
        icon: string;
        many: boolean;
        read_only: boolean;
        active: boolean;
        choices?: undefined;
    } | {
        id: string;
        label: string;
        type: string;
        icon: string;
        many: boolean;
        read_only: boolean;
        active: boolean;
        choices: {
            id: string;
            label: string;
            icon: string;
            active: boolean;
            color: string;
        }[];
    })[];
        { fields_1 as fields };
    let views_1: ({
        id: string;
        label: string;
        description: string;
        icon: string;
        type: string;
        shown: boolean;
        read_only: boolean;
        field_ids: string[];
        sort_field_id: string;
        sort_dir: string;
        group_by_field_id: string;
        query: string;
        opts: {
            date_field_id?: undefined;
        };
    } | {
        id: string;
        label: string;
        description: string;
        icon: string;
        type: string;
        shown: boolean;
        read_only: boolean;
        field_ids: string[];
        sort_field_id: string;
        sort_dir: string;
        group_by_field_id: any;
        query: string;
        opts: {
            date_field_id: string;
        };
    })[];
        { views_1 as views };
    export namespace custom {
        let api_key: string;
        let webhook_url: string;
        export namespace settings {
            let auto_assign: boolean;
            let notifications_enabled: boolean;
            let default_priority: string;
        }
    }
}

const GALLERY_STYLE_COVER: "cover";

const GALLERY_STYLE_COVER_BANNER: "cover-banner";

const GALLERY_STYLE_COVER_BOOKS: "cover-books";

const GALLERY_STYLE_PREVIEW: "preview";

const GALLERY_STYLE_PREVIEW_FEATURED: "preview-featured";

/**
 * Available icons:
 * "file-text": "Document",
 * "pin": "Pin",
 * "camera": "Camera",
 * "barrier-block": "Under Construction / Barrier",
 * "calendar-event": "Calendar event",
 * "globe": "Globe",
 * "heart": "Heart",
 * "music": "Music note",
 * "flower": "Flower",
 * "car": "Car",
 * "book": "Book",
 * "puzzle": "Puzzle",
 * "basket": "Basket",
 * "user": "User",
 * "tag": "Tag",
 * "sun": "Sun",
 * "star": "Star",
 * "briefcase": "Case",
 * "lifebuoy": "Support / Lifebuoy",
 * "lamp": "Lamp",
 * "sparkles": "Sparkles",
 * "lock": "Lock",
 * "wand": "Wand / Magic / AI",
 * "sofa": "Couch / Furniture",
 * "shield": "Shield / Security",
 * "beach": "Beach / Vacation",
 * "world": "World / Earth",
 * "glass-cocktail": "Drink / Beverage",
 * "currency-dollar": "Dollar",
 * "currency-euro": "Euro",
 * "cash": "Cash",
 * "tools": "Tools / Project",
 * "settings": "Settings",
 * "search": "Search",
 * "home": "Home",
 * "gift": "Gift",
 * "eye": "Eye",
 * "droplet": "Droplet",
 * "clock": "Clock",
 * "cloud": "Cloud",
 * "box": "Box",
 * "coin": "Coin",
 * "chart-bar": "Bar chart",
 * "battery": "Battery",
 * "anchor": "Anchor",
 * "alert-triangle": "Alert",
 * "zoom-in": "Zoom in",
 * "wallet": "Wallet",
 * "truck": "Truck",
 * "trophy": "Trophy",
 * "thermometer": "Thermometer",
 * "target": "Target",
 * "sunrise": "Sunrise",
 * "sunset": "Sunset",
 * "smart-home": "Smart home",
 * "skull": "Skull",
 * "ship": "Ship",
 * "share": "Share",
 * "scissors": "Scissors",
 * "ruler": "Ruler",
 * "rocket": "Rocket",
 * "robot": "Robot",
 * "chef-hat": "Chef / Cooking",
 * "refresh": "Recycle",
 * "tools-kitchen": "Kitchen",
 * "radio": "Radio",
 * "printer": "Printer",
 * "pool": "Pool",
 * "microphone": "Microphone",
 * "pizza": "Pizza",
 * "pill": "Pill",
 * "photo": "Photo",
 * "phone-call": "Phone call",
 * "pencil": "Pencil",
 * "paw": "Paw",
 * "confetti": "Confetti / Party",
 * "parking": "Parking",
 * "paint": "Paint",
 * "package": "Package",
 * "outlet": "Outlet",
 * "graph": "Graph",
 * "notes": "Notes",
 * "books": "Books",
 * "notebook": "Notebook / Journal",
 * "news": "News",
 * "movie": "Movie",
 * "motorbike": "Motorbike",
 * "moon": "Moon",
 * "microscope": "Microscope",
 * "cpu": "Microchip / CPU",
 * "map": "Map",
 * "mail": "Mail",
 * "magnet": "Magnet",
 * "lungs": "Lungs",
 * "luggage": "Luggage",
 * "lollipop": "Lollipop",
 * "bug": "Bug",
 * "ticket": "Ticket",
 * "location": "Location",
 * "list": "List",
 * "bulb": "Lightbulb",
 * "server": "Server",
 * "devices": "Devices",
 * "device-laptop": "Laptop",
 * "key": "Key",
 * "device-gamepad": "Gamepad / Joystick",
 * "diamond": "Diamond",
 * "infinity": "Infinity",
 * "ice-cream": "Ice cream",
 * "fire-extinguisher": "Fire Extinguisher",
 * "hexagon": "Hexagon",
 * "helmet": "Helmet",
 * "help": "Help",
 * "letter-t": "Text",
 * "abc": "Name",
 * "headphones": "Headphones",
 * "hammer": "Hammer",
 * "piano": "Piano",
 * "gauge": "Gauge / Dial / Dashboard",
 * "bolt": "Energy / Bolt / Fuel",
 * "friends": "Friends",
 * "fridge": "Fridge",
 * "forklift": "Forklift",
 * "folder": "Folder",
 * "fish": "Fish",
 * "fingerprint": "Fingerprint",
 * "fence": "Fence",
 * "feather": "Feather",
 * "engine": "Engine",
 * "egg": "Egg",
 * "school": "School / Education",
 * "download": "Download",
 * "dog": "Dog",
 * "dna": "DNA",
 * "disc": "Disc",
 * "id": "Badge / ID",
 * "database": "Database",
 * "dice": "Dice",
 * "shopping-cart": "Shopping Cart",
 * "cylinder": "Cylinder",
 * "crown": "Crown",
 * "trees": "Trees / Park",
 * "filter": "Filter",
 * "moon-stars": "Moon / Stars",
 * "credit-card": "Credit card",
 * "crane": "Crane",
 * "files": "Files",
 * "compass": "Compass",
 * "coffee": "Coffee",
 * "cloud-upload": "Cloud upload",
 * "clipboard-check": "Clipboard check",
 * "chess": "Chess",
 * "check": "Check",
 * "chart-pie": "Chart pie",
 * "chart-line": "Chart line",
 * "chalkboard": "Chalkboard",
 * "certificate": "Certificate",
 * "candy": "Candy",
 * "plane": "Plane",
 * "calendar": "Calendar",
 * "calculator": "Calculator",
 * "butterfly": "Butterfly",
 * "bulldozer": "Bulldozer",
 * "brush": "Brush",
 * "bow": "Bow",
 * "bookmark": "Bookmark",
 * "bone": "Bone",
 * "bomb": "Bomb",
 * "bluetooth": "Bluetooth",
 * "bell": "Bell",
 * "backpack": "Backpack",
 * "axe": "Axe",
 * "atom": "Atom",
 * "ambulance": "Ambulance",
 * "alarm": "Alarm",
 * "adjustments": "Adjustments / Settings",
 * "activity": "Activity",
 * "barbell": "Barbell / Weight",
 * "baby-carriage": "Stroller",
 * "speakerphone": "Megaphone",
 * "leaf": "Leaf",
 * "scuba-mask": "Scuba",
 * "building-skyscraper": "Business / Building",
 * "satellite": "Satellite",
 * "currency-pound": "Pound",
 * "currency-yen": "Yen",
 * "currency-krone-swedish": "Krona",
 * "currency-yuan": "Yuan",
 * "picnic-table": "Picnic",
 * "meat": "Meat",
 * "tools-kitchen-2": "Knife / Fork",
 * "bowl-spoon": "Bowl / Spoon",
 * "run": "Running",
 * "scale": "Scale",
 * "heartbeat": "Heartbeat",
 * "temperature": "Temperature",
 * "carrot": "Carrot / Vegetable",
 * "ball-football": "Football",
 * "ball-american-football": "American Football",
 * "bed": "Bed",
 * "burger": "Hamburger / Food",
 * "sum": "Sum / Total",
 * "math-function": "Math / Function",
 * "math": "Math",
 * "math-x-divide-y": "Division",
 * "decimal": "Decimal",
 * "salad": "Salad / Food",
 * "soup": "Soup / Food",
 * "table": "Table",
 * "layout-kanban": "Kanban Board",
 * "layout-dashboard": "Dashboard",
 * "layout-grid": "Grid",
 * "layout-cards": "Card",
 * "layout-list": "List",
 * "file-invoice": "Invoice",
 * "file-description": "Description",
 * "article": "Article",
 * "clipboard-text": "Clipboard",
 * "message-circle": "Discussion / Comment",
 * "presentation": "Presentation",
 * "analyze": "Analysis",
 * "mood-happy": "Mood",
 * "hourglass": "Hourglass / Time",
 * "medal": "Medal / Achievement",
 * "flame": "Streak / Habit / Flame",
 * "receipt": "Receipt / Log",
 * "stack": "Stack",
 * "quote": "Quote",
 * "paperclip": "Paperclip / Attachment",
 */
type IconName = string;

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_BOLD: "bold";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_CODE: "code";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_DATETIME: "datetime";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_HASHTAG: "hashtag";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_ICON: "icon";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_ITALIC: "italic";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_LINK: "link";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_LINKOBJ: "linkobj";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_MENTION: "mention";

const PLUGIN_LINE_ITEM_SEGMENT_TYPE_REF: "ref";

/**
 * @typedef {PLUGIN_LINE_ITEM_TYPE_COLLECTION|
 * PLUGIN_LINE_ITEM_TYPE_GLOBAL_PLUGIN|
 * PLUGIN_LINE_ITEM_TYPE_RECORD|
 * PLUGIN_LINE_ITEM_TYPE_EMPTY|
 * PLUGIN_LINE_ITEM_TYPE_ERROR|
 * PLUGIN_LINE_ITEM_TYPE_BR|
 * PLUGIN_LINE_ITEM_TYPE_TEXT|
 * PLUGIN_LINE_ITEM_TYPE_TASK|
 * PLUGIN_LINE_ITEM_TYPE_HEADING|
 * PLUGIN_LINE_ITEM_TYPE_ASCII_BANNER|
 * PLUGIN_LINE_ITEM_TYPE_QUOTE|
 * PLUGIN_LINE_ITEM_TYPE_BLOCK|
 * PLUGIN_LINE_ITEM_TYPE_OLIST|
 * PLUGIN_LINE_ITEM_TYPE_ULIST|
 * PLUGIN_LINE_ITEM_TYPE_IMAGE|
 * PLUGIN_LINE_ITEM_TYPE_FILE|
 * PLUGIN_LINE_ITEM_TYPE_REF|
 * PLUGIN_LINE_ITEM_TYPE_TABLE|
 * PLUGIN_LINE_ITEM_TYPE_TABLE_CELL|
 * PLUGIN_LINE_ITEM_TYPE_TABLE_ROW|
 * PLUGIN_LINE_ITEM_TYPE_TRANSCLUSION|
 * PLUGIN_LINE_ITEM_TYPE_QUERY|
 * PLUGIN_LINE_ITEM_TYPE_MEDIA} PluginLineItemType
 */
const PLUGIN_LINE_ITEM_SEGMENT_TYPE_TEXT: "text";

const PLUGIN_LINE_ITEM_TYPE_ASCII_BANNER: "ascii-banner";

const PLUGIN_LINE_ITEM_TYPE_BLOCK: "block";

const PLUGIN_LINE_ITEM_TYPE_BR: "br";

const PLUGIN_LINE_ITEM_TYPE_COLLECTION: "app";

const PLUGIN_LINE_ITEM_TYPE_EMPTY: "empty";

const PLUGIN_LINE_ITEM_TYPE_ERROR: "error";

const PLUGIN_LINE_ITEM_TYPE_FILE: "file";

const PLUGIN_LINE_ITEM_TYPE_GLOBAL_PLUGIN: "gplugin";

const PLUGIN_LINE_ITEM_TYPE_HEADING: "heading";

const PLUGIN_LINE_ITEM_TYPE_IMAGE: "image";

const PLUGIN_LINE_ITEM_TYPE_MEDIA: "media";

const PLUGIN_LINE_ITEM_TYPE_OLIST: "olist";

const PLUGIN_LINE_ITEM_TYPE_QUERY: "query";

const PLUGIN_LINE_ITEM_TYPE_QUOTE: "quote";

const PLUGIN_LINE_ITEM_TYPE_RECORD: "document";

const PLUGIN_LINE_ITEM_TYPE_REF: "ref";

const PLUGIN_LINE_ITEM_TYPE_TABLE: "table";

const PLUGIN_LINE_ITEM_TYPE_TABLE_CELL: "table-cell";

const PLUGIN_LINE_ITEM_TYPE_TABLE_ROW: "table-row";

const PLUGIN_LINE_ITEM_TYPE_TASK: "task";

const PLUGIN_LINE_ITEM_TYPE_TEXT: "text";

const PLUGIN_LINE_ITEM_TYPE_TRANSCLUSION: "transclusion";

const PLUGIN_LINE_ITEM_TYPE_ULIST: "ulist";

type PluginBlockStyle = "" | "quote" | "warning" | "note" | "row";

class PluginCollectionAPI extends PluginPluginAPIBase {
    /**
     * @public
     * Get the code and config currently used by the plugin.
     *
     * @returns {{code: string, json: PluginConfiguration}}
     */
    public getExistingCodeAndConfig(): {
        code: string;
        json: PluginConfiguration;
    };
    /**
     * @public
     * Get the name of the collection
     *
     * @returns {string}
     */
    public getName(): string;
    /**
     * @public
     * Get the plugin's configuration.
     *
     * @returns {PluginConfiguration}
     */
    public getConfiguration(): PluginConfiguration;
    /**
     * @public
     * Create a new record in this collection.
     *
     * @param {string} recordName - name of the new record
     *
     * @returns {string?} - guid of the new record, or null if creation failed
     */
    public createRecord(recordName?: string): string | null;
    /**
     * @public
     * Get the guid of the collection
     *
     * @returns {string}
     */
    public getGuid(): string;
    /**
     * @public
     * Get all records in the collection
     *
     * @returns {Promise<PluginRecord[]>}
     */
    public getAllRecords(): Promise<PluginRecord[]>;
}

type PluginCommandPaletteCommand = {
    remove: () => void;
};

type PluginConfiguration = {
    /**
     * - for future compat
     */
    ver: number;
    /**
     * - collection icon
     */
    icon: string;
    /**
     * - collection name
     */
    name: string;
    /**
     * - name for item in collection
     */
    item_name: string;
    /**
     * - collection description
     */
    description: string;
    /**
     * - show items in sidebar?
     */
    show_sidebar_items: boolean;
    /**
     * - show items in command palette?
     */
    show_cmdpal_items: boolean;
    /**
     * - Optional. Was configurable in Sidebar tab in Collection Dialog (see 'id--action-select' in dialogs.js), now only configurable in config/code (e.g. Journal plugin uses it)
     */
    sidebar_action?: {
        guid: string | null;
        action: CollectionPrimaryAction;
    };
    /**
     * - Override to use as collection's default banner. Null by default (use banner image user selects in Change Banner dialog).
     */
    default_banner?: PropertyFileValue | null;
    views: CollectionView[];
    /**
     * - [PropertyField,]
     */
    fields: PropertyField[];
    /**
     * - list of field ids (from PluginConfiguration.fields) we want to show on item pages
     */
    page_field_ids: string[];
    /**
     * - one of [field.id for field in fields]
     */
    sidebar_record_sort_field_id: string;
    /**
     * - see SortDir
     */
    sidebar_record_sort_dir: PluginSortDir;
    /**
     * - specify which parts user can change in dialog and which should be shown as "managed" by the plugin code
     */
    managed: {
        fields: boolean;
        views: boolean;
        sidebar: boolean;
    };
    /**
     * - custom configuration for user's plugin code (like API keys and so on)
     */
    custom?: {
        [x: string]: any;
    };
    home: boolean;
};

/**
 * @public
 * PluginConfiguration Documentation
 * =================================
 *
 * A plugin's PluginConfiguration JSON is defined in the plugin.json file.
 *
 * Collection Plugins vs Global Plugins
 * ----------------------------------
 * - Collection Plugins: The full configuration is used, including properties, views, and collection settings
 * - Global Plugins: Only basic fields like name and icon are relevant, as global plugins don't have properties or views
 *
 * Key Configuration Areas
 * ----------------------
 * 1. Collection Properties
 *    - Define data fields/properties that items (records) in the collection can have
 *    - Specify field types, labels, icons, and behavior
 *
 * 2. Collection Views
 *    - Configure how data is displayed in the collection (table, board, gallery, etc.)
 *    - Set default sorting, grouping, and visible fields
 *
 * 3. Behavior Settings
 *    - Control sidebar visibility
 *    - Enable/disable command palette integration
 *    - Configure default banners and actions
 *
 * 4. Custom Configuration
 *    - Add plugin-specific settings via the "custom" field
 *    - Store API tokens, UI preferences, or any other plugin settings
 *
 * Dynamic Configuration
 * --------------------
 * - The configuration can be modified programmatically or through the Edit Collection dialog
 * - Changes made in the UI automatically update the underlying JSON
 * - Combine with plugin code for advanced features (e.g., "dynamic" properties for which values are
 *   being calcuated with formulas using this.properties.formula())
 *
 * See the example configuration below for a complete demonstration of available options.
 *
 * @type {PluginConfiguration?}
 */
const _PluginConfigurationDoc: PluginConfiguration | null;

type PluginDropdown = {
    /**
     * Destroy the dropdown
     */
    destroy: () => void;
};

type PluginDropdownOption = {
    /**
     * Text label to display for this option
     */
    label: string;
    /**
     * Icon class name (e.g. "ti-bug")
     */
    icon?: IconName;
    /**
     * Function called when this option is selected
     */
    onSelected?: () => void;
};

class PluginGlobalPluginAPI extends PluginPluginAPIBase {
    /**
     * @public
     * Get the code and config currently used by the plugin.
     *
     * @returns {{code: string, json: PluginConfiguration}}
     */
    public getExistingCodeAndConfig(): {
        code: string;
        json: PluginConfiguration;
    };
    /**
     * @public
     * Get the guid of the global plugin
     *
     * @returns {string}
     */
    public getGuid(): string;
    /**
     * @public
     * Get the plugin's configuration.
     *
     * @returns {PluginConfiguration}
     */
    public getConfiguration(): PluginConfiguration;
    /**
     * @public
     * Get the name of the global plugin
     *
     * @returns {string}
     */
    public getName(): string;
}

type PluginHighlightLanguage = "bash" | "c" | "coffeescript" | "cpp" | "csharp" | "css" | "dart" | "diff" | "go" | "graphql" | "ini" | "java" | "javascript" | "json" | "kotlin" | "less" | "lua" | "makefile" | "markdown" | "objectivec" | "perl" | "php" | "php-template" | "plaintext" | "powershell" | "python" | "python-repl" | "r" | "ruby" | "rust" | "scala" | "scss" | "shell" | "sql" | "swift" | "typescript" | "vbnet" | "wasm" | "xml" | "yaml";

/**
 * @typedef {{ [key: string]: any }} PluginLineItemProps
 */
/**
 * @typedef {'flames'|'outline'|'link-icons'|'link-buttons'} PluginLinkStyle
 */
/**
 * @typedef {'bash'|'c'|'coffeescript'|'cpp'|'csharp'|'css'|'dart'|'diff'|'go'|'graphql'|'ini'|'java'|'javascript'|'json'|'kotlin'|'less'|'lua'|'makefile'|'markdown'|'objectivec'|'perl'|'php'|'php-template'|'plaintext'|'powershell'|'python'|'python-repl'|'r'|'ruby'|'rust'|'scala'|'scss'|'shell'|'sql'|'swift'|'typescript'|'vbnet'|'wasm'|'xml'|'yaml'} PluginHighlightLanguage
 */
/**
 * @typedef {''|'quote'|'warning'|'note'|'row'} PluginBlockStyle
 */
class PluginLineItem {

    /** @type {string} */
    guid: string;
    /** @type {PluginLineItemType} */
    type: PluginLineItemType;
    /** @type {PluginRecord} */
    record: PluginRecord;
    /** @type {string?} */
    parent_guid: string | null;
    /** @type {PluginLineItem[]} */
    children: PluginLineItem[];
    /** @type {PluginLineItemSegment[]} */
    segments: PluginLineItemSegment[];
    /** @type {PluginLineItemProps?} */
    props: PluginLineItemProps | null;
    _plugin: any;
    _item: any;
    /**
     * @public
     * Set the segments of the line item
     *
     * @param {PluginLineItemSegment[]} segments
     */
    public setSegments(segments: PluginLineItemSegment[]): void;

    /**
     * @returns {Date?}
     */
    getCreatedAt(): Date | null;
    /**
     * @returns {Date?}
     */
    getUpdatedAt(): Date | null;
    /**
     * @returns {string?}
     */
    getCreatedByGuid(): string | null;
    /**
     * @returns {string?}
     */
    getUpdatedByGuid(): string | null;
    /**
     * @public
     * Set a single meta property on the line item.
     *
     * @param {string} prop - The property key
     * @param {string|number|null} val - The value to set, or null to delete the property
     */
    public setMetaProperty(prop: string, val: string | number | null): void;
    /**
     * @public
     * Set multiple meta properties on the line item.
     *
     * - null value to delete a property
     * - existing properties are overwritten
     * - properties for which no keys are provided are not touched
     *
     * @param {Record<string, any>} props - Object with property key-value pairs
     */
    public setMetaProperties(props: Record<string, any>): void;
    /**
     * @public
     * Set the heading size (1-6) for heading line items.
     *
     * @param {number} size - Heading size from 1 (largest) to 6 (smallest)
     */
    public setHeadingSize(size: number): void;
    /**
     * @public
     * Get the heading size for heading line items.
     *
     * @returns {number} Heading size (1-6), defaults to 1
     */
    public getHeadingSize(): number;
    /**
     * @public
     * Set the syntax highlighting language for code blocks.
     *
     * @param {PluginHighlightLanguage|null} language - Language identifier, or null to remove highlighting
     */
    public setHighlightLanguage(language: PluginHighlightLanguage | null): void;
    /**
     * @public
     * Get the syntax highlighting language for code blocks.
     *
     * @returns {PluginHighlightLanguage|null} Language identifier or null
     */
    public getHighlightLanguage(): PluginHighlightLanguage | null;
    /**
     * @public
     * Set the block style.
     *
     * @param {PluginBlockStyle|null} style - Block style, or null to remove
     */
    public setBlockStyle(style: PluginBlockStyle | null): void;
    /**
     * @public
     * Get the block style.
     *
     * @returns {PluginBlockStyle|null} Block style or null
     */
    public getBlockStyle(): PluginBlockStyle | null;
    /**
     * @public
     * Set the icon for a heading line item.
     *
     * @param {string|null} icon - Icon identifier (e.g. "ti-star"), or null to remove
     */
    public setIcon(icon: string | null): void;
    /**
     * @public
     * Get the icon for a line item.
     *
     * @returns {string|null} Icon identifier or null
     */
    public getIcon(): string | null;
    /**
     * @public
     * Set the link style for heading line items.
     *
     * @param {PluginLinkStyle|null} style - Link style
     */
    public setLinkStyle(style: PluginLinkStyle | null): void;
    /**
     * @public
     * Get the link style.
     *
     * @returns {PluginLinkStyle|null} Link style or null
     */
    public getLinkStyle(): PluginLinkStyle | null;
}

type PluginLineItemProps = {
    [key: string]: any;
};

/**
 * @typedef {PLUGIN_LINE_ITEM_SEGMENT_TYPE_TEXT|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_BOLD|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_ITALIC|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_CODE|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_LINK|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_ICON|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_HASHTAG|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_MENTION|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_REF|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_LINKOBJ|
     * PLUGIN_LINE_ITEM_SEGMENT_TYPE_DATETIME} PluginLineItemSegmentType
 */
/**
 * Each line item can have multiple segments. Each segment is a piece of text with a type.
 */
class PluginLineItemSegment {
    /**
     * @param {string} type
     * @param {string} text
     */
    constructor(type: string, text: string);
    /** @type {PluginLineItemSegmentType} */
    type: PluginLineItemSegmentType;
    /** @type {string} */
    text: string;
}

type PluginLineItemSegmentType = "text" | "bold" | "italic" | "code" | "link" | "icon" | "hashtag" | "mention" | "ref" | "linkobj" | "datetime";

type PluginLineItemType = "app" | "gplugin" | "document" | "empty" | "error" | "br" | "text" | "task" | "heading" | "ascii-banner" | "quote" | "block" | "olist" | "ulist" | "image" | "file" | "ref" | "table" | "table-cell" | "table-row" | "transclusion" | "query" | "media";

type PluginLinkStyle = "flames" | "outline" | "link-icons" | "link-buttons";

type PluginNavigationButton = {
    /**
     * Remove the navigation button
     */
    remove: () => void;
    /**
     * Update the text label
     */
    setLabel: (newLabel: string) => void;
    /**
     * Update the HTML label
     */
    setHtmlLabel: (newHtmlLabel: string | null) => void;
    /**
     * Update the icon
     */
    setIcon: (newIcon: IconName | null) => void;
    /**
     * Update the tooltip text
     */
    setTooltip: (newTooltip: string) => void;
    /**
     * Update whether to only show when expanded
     */
    setOnlyWhenExpanded: (onlyWhenExpanded: boolean) => void;
};

/**
 * PluginPanel provides a higher-level abstraction for interacting with panels
 * without exposing all the underlying Panel functionality.
 */
class PluginPanel {


    _plugin: any;
    /**
     * @public
     * Get the panel's unique identifier
     *
     * @returns {string}
     */
    public getId(): string;
    /**
     * @public
     * Get the panel's type
     *
     * @returns {string}
     */
    public getType(): string;
    /**
     * @public
     * Check if this panel is currently focused/active
     *
     * @returns {boolean}
     */
    public isActive(): boolean;
    /**
     * @public
     * Check if this panel is a sidebar panel
     *
     * @returns {boolean}
     */
    public isSidebar(): boolean;
    /**
     * @public
     * Get the panel's navigation state
     *
     * @returns {Object}
     */
    public getNavigation(): any;
    /**
     * @public
     * Navigate the panel to any new location
     *
     * @param {Object} navigation Navigation state
     * @param {string} navigation.type Panel type
     * @param {string?} navigation.rootId Root ID
     * @param {string?} navigation.subId Sub ID
     * @param {string?} navigation.workspaceGuid Workspace GUID
     * @param {Object} [navigation.state] Additional state
     */
    public navigateTo(navigation: {
        type: string;
        rootId: string | null;
        subId: string | null;
        workspaceGuid: string | null;
        state?: any;
    }): void;
    /**
     * @public
     * Navigate to a custom panel you registered using registerCustomPanel()
     *
     * @param {string} myPanelId - the ID of the panel to navigate to
     */
    public navigateToCustomType(myPanelId: string): void;
    /**
     * @public
     * Get the panel's DOM element
     *
     * @returns {HTMLElement?}
     */
    public getElement(): HTMLElement | null;
    /**
     * @public
     * Set the panel's title in the titlebar
     *
     * @param {string} title
     */
    public setTitle(title: string): void;
    /**
     * @public
     * Get the active record loaded in this panel (if any)
     *
     * @returns {PluginRecord?}
     */
    public getActiveRecord(): PluginRecord | null;
    /**
     * @public
     * Get the active collection loaded in this panel (if any)
     *
     * @returns {PluginCollectionAPI?}
     */
    public getActiveCollection(): PluginCollectionAPI | null;
}

type PluginPanelNavigation = {
    /**
     * Panel type
     */
    type: string;
    /**
     * Root ID
     */
    rootId: string | null;
    /**
     * Sub ID
     */
    subId: string | null;
    /**
     * Workspace GUID
     */
    workspaceGuid: string | null;
    /**
     * Additional state
     */
    state?: any;
};

/**
 * @public
 * An API for a plugin to manage (other) plugins
 */
class PluginPluginAPIBase {

    /** @type {string} */
    guid: string;
    collectionRoot: any;


    trashPlugin(): void;
    untrashPlugin(): void;


}

/**
 * @typedef {CollectionViewType} PluginViewType
 * Available view types for plugins.
 */
/**
 * @typedef {SORT_DIR_ASC|SORT_DIR_DESC} PluginSortDir
 */
class PluginProperty {

    /** @type {string} */
    name: string;
    /** @type {string} */
    guid: string;
    plugin: any;
    field: any;
    value: any;
    row: any;
    /**
     * @public
     * Get the property value as a number, or null if a number value is not available.
     *
     * @returns {number?}
     */
    public number(): number | null;
    /**
     * @public
     * Get the property value as a string, or null if a string value is not available.
     *
     * @returns {string?}
     */
    public text(): string | null;
    /**
     * @public
     * Get the "id" of the choice (enum) value, or null if a choice value is not available.
     *
     * @returns {string?}
     */
    public choice(): string | null;
    /**
     * @public
     * Set the property value (should be a valid value for this property type)
     *
     * @param {any} v
     */
    public set(v: any): void;
    /**
     * @public
     * If this property is of type Choice, set the value to the choice/status/enum with the given
     * choiceName.
     *
     * @example
     * record.prop("Status").setChoice("Pending");
     *
     * @param {string} choiceName
     * @returns {boolean} true if the choice was set, false if the property is not a choice or the choice was not found
     */
    public setChoice(choiceName: string): boolean;
    /**
     * @public
     * Get the property value as a date (in your browser local timezone), or null if a date value is not available.
     *
     * @returns {Date?}
     */
    public date(): Date | null;
}

class PluginRecord {

    /** @type {string} */
    guid: string;
    plugin: any;
    row: any;

    /**
     * @public
     * Get all records that reference this record or any of its line items.
     *
     * @returns {Promise<PluginRecord[]>}
     */
    public getBackReferenceRecords(): Promise<PluginRecord[]>;
    /**
     * @public
     * Get the name (title) of the record
     *
     * @returns {string}
     */
    public getName(): string;
    /**
     * @public
     * Create a new line item in this record
     *
     * @param {PluginLineItem?} parentItem - null: use record as parent
     * @param {PluginLineItem?} afterItem
     * @param {PluginLineItemType} type
     * @returns {Promise<PluginLineItem?>} - returns new line item, null when failed
     */
    public createLineItem(parentItem: PluginLineItem | null, afterItem: PluginLineItem | null, type: PluginLineItemType): Promise<PluginLineItem | null>;
    /**
     * @public
     * Get all line items in this record's document tree
     *
     * @returns {Promise<PluginLineItem[]>}
     */
    public getLineItems(): Promise<PluginLineItem[]>;
    /**
     * @public
     * Get all properties of the record. If viewName is provided, only return properties that are visible
     * in that view. If no viewName is provided, return properties as visible when viewing the page in the editor.
     *
     * @param {string?} viewName
     * @returns {PluginProperty[]}
     */
    public getProperties(viewName: string | null): PluginProperty[];
    /**
     * @public
     * Get all properties of the record, including properties that are not visible in any view.
     *
     * @returns {PluginProperty[]}
     */
    public getAllProperties(): PluginProperty[];
    /**
     * @public
     * @param {string} name - Name or guid of the Property (first tries to find by name, then by guid)
     * @returns {PluginProperty?}
     */
    public prop(name: string): PluginProperty | null;
    /**
     * @public
     * Shorthand for prop(name).number()
     *
     * @example
     * const price = record.number("Price");
     *
     * @param {*} name
     * @returns {number?}
     */
    public number(name: any): number | null;
    /**
     * @public
     * Shorthand for prop(name).date()
     *
     * @example
     * const startDate = record.date("Start Date");
     *
     * @param {*} name
     * @returns {Date?}
     */
    public date(name: any): Date | null;
    /**
     * @public
     * Shorthand for prop(name).text()
     *
     * @example
     * const name = record.text("Name");
     *
     * @param {*} name
     * @returns {string?}
     */
    public text(name: any): string | null;
}

type PluginSideBarItem = {
    /**
     * Remove the sidebar item
     */
    remove: () => void;
    /**
     * Update the label text
     */
    setLabel: (newLabel: string) => void;
    /**
     * Update the icon
     */
    setIcon: (newIcon: IconName | null) => void;
    /**
     * Update the tooltip text
     */
    setTooltip: (newTooltip: string) => void;
};

type PluginSortDir = "asc" | "desc";

type PluginStatusBarItem = {
    remove: () => void;
    setHtmlLabel: (newHtmlLabel: string) => void;
    setLabel: (newLabel: string) => void;
    setIcon: (newIcon: IconName) => void;
    setTooltip: (newTip: string) => void;
    hide: () => void;
    show: () => void;
    getElement: () => HTMLElement | null;
};

type PluginToaster = {
    /**
     * The toaster element
     */
    element: HTMLElement;
    destroy: () => void;
    bounce: () => void;
    center: () => void;
};

class PluginUser {

    /** @type {string} */
    guid: string;
    /** @type {string} */
    workspaceGuid: string;
    plugin: any;
    user: any;
    /**
     * @public
     * Get the user's avatar image as base64 data
     *
     * @returns {string?}
     */
    public getAvatar(): string | null;
    isAdmin(): any;
    isOwner(): any;
    getLastSeenSeconds(): any;
    getDisplayName(): any;
    /**
     * @public
     * Get the user's email address
     *
     * @returns {string?}
     */
    public getEmail(): string | null;
}

class PluginViewConfig {

    /** @type {string} */
    name: string;


    /** @type {string} */
    guid: string;
    /** @type {PluginViewType} */
    type: PluginViewType;
}

class PluginViewContext {

    /** @type {string} - unique local ID for the instance of this view (i.e. stable while the view is open in the UI) */
    instanceId: string;
    plugin: any;
    viewConfig: any;
    viewClass: any;

    /**
     * @public
     * Whether the view has been destroyed. Call this if you're doing any async work in any of your hooks before
     * continuing interacting with the view.
     *
     * @example
     * onRefresh: async ({records}) => {
     *     await viewClass.doSomethingAsync();
     *     if (viewClass.isDestroyed()) return; // view has been destroyed while async work was in progress
     *     viewCtx.getElement().innerHTML = "Result of something async";
     * }
     *
     * @returns {boolean}
     */
    public isDestroyed(): boolean;
    /**
     * @public
     * The view is initially sorted by the given field as given in the view config.
     * fieldName is the name or ID of the field as shown in the view config.
     *
     * @example
     * this.views.setSortColumn("Name", "asc");
     *
     * @param {string} fieldName
     * @param {PluginSortDir} dir
     */
    public setSortColumn(fieldName: string, dir: PluginSortDir): void;
    /**
     * @public
     * Get the element of the view.
     *
     * @returns {HTMLElement}
     */
    public getElement(): HTMLElement;
    /**
     * @public
     * Get IDs of all properties that are visible in the view.
     *
     * @returns {string[]}
     */
    public getVisiblePropertyIds(): string[];
    /**
     * @public
     * Get all records in the view.
     *
     * @returns {PluginRecord[]}
     */
    public getAllRecords(): PluginRecord[];
    /**
     * @public
     * Get the record with the given guid.
     *
     * @param {string} guid
     * @returns {PluginRecord?}
     */
    public getRecord(guid: string): PluginRecord | null;
    /**
     * @public
     * Use wide layout with no margins and full-width content area.
     */
    public makeWideLayout(): void;
    /**
     * @public
     * Use normal layout with margins and fixed-width content area.
     */
    public makeNormalLayout(): void;
    /**
     * @public
     * Whether the view supports creating new records.
     *
     * @returns {boolean}
     */
    public supportsCreateRecord(): boolean;
    /**
     * @public
     * Get the name we give records in this collection, e.g. a "Note" or a "Contact"
     *
     * @returns {string}
     */
    public getRecordTypeName(): string;
    /**
     * @public
     * Create a new record in the view. When record is created, the view will refresh and
     * your onRefresh() hook will be called.
     *
     * @returns {string?} - guid of the new record, or null if creation failed
     */
    public createRecord(): string | null;
    /**
     * @public
     * Return whether the view is viewing an old version of the collection (View History is active).
     * We shouldn't allow the user to make changes to the collection when this is the case.
     *
     * @returns {boolean}
     */
    public isViewingOldVersion(): boolean;
    /**
     * @public
     * Open the record in this panel.
     *
     * @param {string} guid
     */
    public openRecordInThisPanel(guid: string): void;
    /**
     * @public
     * Open the record in another panel.
     *
     * @param {string} guid
     */
    public openRecordInOtherPanel(guid: string): void;
}

/**
 * Available view types for plugins.
 */
type PluginViewType = CollectionViewType;

type PROP_TYPE = typeof PROP_TYPE_CHOICE | typeof PROP_TYPE_NUMBER | typeof PROP_TYPE_PLAINTEXT | typeof PROP_TYPE_FILE | typeof PROP_TYPE_IMAGE | typeof PROP_TYPE_URL | typeof PROP_TYPE_RECORD | typeof PROP_TYPE_USER | typeof PROP_TYPE_HASHTAG | typeof PROP_TYPE_DATETIME | typeof PROP_TYPE_BANNER | typeof PROP_TYPE_DYNAMIC;

const PROP_TYPE_BANNER: "banner";

/**
 * @typedef {COLLECTION_PRIMARY_ACTION_OVERVIEW|COLLECTION_PRIMARY_ACTION_RECORD|COLLECTION_PRIMARY_ACTION_FIRST} CollectionPrimaryAction
 */
const PROP_TYPE_CHOICE: "choice";

const PROP_TYPE_DATETIME: "datetime";

const PROP_TYPE_DYNAMIC: "dynamic";

const PROP_TYPE_FILE: "file";

const PROP_TYPE_HASHTAG: "hashtag";

const PROP_TYPE_IMAGE: "image";

const PROP_TYPE_NUMBER: "number";

const PROP_TYPE_PLAINTEXT: "text";

const PROP_TYPE_RECORD: "record";

const PROP_TYPE_URL: "url";

const PROP_TYPE_USER: "user";

/**
 * Properties API for Collection Plugins
 */
class PropertiesAPI {

    plugin: any;
    /**
     * @public
     *
     * Sets a formula function that computes the value of a Property.
     * The formula function will be called whenever the Property needs to be recalculated.
     *
     * @example
     * this.properties.formula("Total", ({record, prop}) => {
     *     const quantity = record.number("Hours");
     *     const unitPrice = record.number("Amount");
     *     if (quantity === null || unitPrice === null) {
     *         return null;
     *     }
     *     return quantity * unitPrice;
     * });
     *
     * @param {string} name - Name or guid of the Property (first tries to find by name, then by guid)
     * @param {({record, prop}: {record: PluginRecord, prop: PluginProperty}) => any} fn - Function that computes the Property value
     */
    public formula(name: string, fn: ({ record, prop }: {
        record: PluginRecord;
        prop: PluginProperty;
    }) => any): void;
    /**
     * @public
     *
     * Sets a custom sort function for a property.
     *
     * @param {string} name - Name or guid of the Property (first tries to find by name, then by guid)
     * @param {({records, propertyId, dir}: {records: PluginRecord[], propertyId: string, dir: PluginSortDir}) => PluginRecord[]} fn - Function that computes the Property value
     */
    public customSort(name: string, fn: ({ records, propertyId, dir }: {
        records: PluginRecord[];
        propertyId: string;
        dir: PluginSortDir;
    }) => PluginRecord[]): void;
    /**
     * @public
     *
     * Sets a function that overrides the default rendering of the property value.
     *
     * @param {string} name - Name or guid of the Property (first tries to find by name, then by guid)
     * @param {({record, prop, view}: {record: PluginRecord?, prop: PluginProperty, view: PluginViewConfig?}) => HTMLElement?} fn - Function that renders the Property value. null: render as default.
     */
    public render(name: string, fn: ({ record, prop, view }: {
        record: PluginRecord | null;
        prop: PluginProperty;
        view: PluginViewConfig | null;
    }) => HTMLElement | null): void;
}

type PropertyChoiceOption = {
    /**
     * - some unique ID (within this Plugin). cannot be modified ("renaming" id is seen as new property column)
     */
    id: string;
    label: string;
    icon: string;
    json?: {
        avatar?: string | null;
        displayName?: string | null;
    };
    /**
     * - color value, always a number for now. see ENUM_COLORS
     */
    color: string;
    /**
     * - set to false to "delete"/"archive" a choice while keeping its details
     */
    active: boolean;
};

type PropertyField = {
    /**
     * - some unique ID (within this Plugin). cannot be modified ("renaming" id is seen as new property column)
     */
    id: string;
    label: string;
    type: any;
    icon: string;
    /**
     * - set to false to "delete"/"archive" a property while keeping all its data
     */
    active: boolean;
    /**
     * - can user add multiple values for this property? TODO: not supported yet, always false
     */
    many: boolean;
    /**
     * // Type-specific options
     */
    read_only: boolean;
    choices?: PropertyChoiceOption[];
    min_length?: number;
    /**
     * - Format for PROP_TYPE_NUMBER: 'plain', 'formatted', or currency code ('USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NOK'). Defaults to 'formatted'.
     */
    number_format?: string;
};

type PropertyFileValue = {
    /**
     * - filename
     */
    name: string;
    /**
     * - in case of failed upload
     *
     * - the data for this file:
     */
    error: string | null;
    /**
     * - file data is in Blob with this GUID, OR
     */
    guid: string | null;
    /**
     * - file is an image, data is encoded in this string (used for small data, like a gradient image), OR
     */
    imgData: string | null;
    /**
     * - file is an image, data is at this URL
     */
    imgUrl: string | null;
    /**
     * - file is an image, rendered by this built-in class
     */
    imgClass: string | null;
    /**
     * - if this is a compressed/resized version of an image, this points to the original
     */
    original?: PropertyFileValue;
};

const SORT_DIR_ASC: "asc";

const SORT_DIR_DESC: "desc";

class UIAPI {


    /**
     * @public
     * @param {string} rawHtml
     * @returns {HTMLElement} */
    public $html(rawHtml: string): HTMLElement;
    /**
     * @public
     * @param {string} name
     * @returns {string}
     */
    public getSpinnerHtml(name: string): string;
    /**
     * @public
     * @param {Element|HTMLElement} element
     */
    public bounce(element: Element | HTMLElement): void;
    /**
     * @public
     *
     * @param {string} html
     * @returns {string} - HTML string with all special characters escaped
     */
    public htmlEscape(html: string): string;
    /**
     * @public
     *
     * Creates a button.
     *
     * @param {Object} options Button options
     * @param {IconName} options.icon Icon class name (e.g. "ti-bug")
     * @param {string} options.label Text label to display in the button
     * @param {() => void} [options.onClick] Click handler function (when adding many buttons, consider a delegate function instead)
     * @returns {HTMLElement} The created button
     */
    public createButton(options: {
        icon: IconName;
        label: string;
        onClick?: () => void;
    }): HTMLElement;
    /**
     * @public
     *
     * Creates an icon.
     *
     * @param {IconName} iconName
     * @returns {HTMLElement} The created icon
     */
    public createIcon(iconName: IconName): HTMLElement;
    /**
     * @public
     *
     * Creates a dropdown menu with autocomplete options.
     *
     * @param {Object} options Dropdown options
     * @param {HTMLElement} options.attachedTo Element to attach the dropdown to
     * @param {PluginDropdownOption[]} options.options Array of dropdown options
     * @param {string} [options.inputPlaceholder] Placeholder text for the search input (default: "Search...")
     * @param {number} [options.width] Width of the dropdown in pixels (default: 300)
     * @param {number} [options.extraMarginY] Additional vertical margin from the attached element
     * @returns {PluginDropdown} The created dropdown
     */
    public createDropdown(options: {
        attachedTo: HTMLElement;
        options: PluginDropdownOption[];
        inputPlaceholder?: string;
        width?: number;
        extraMarginY?: number;
    }): PluginDropdown;
    /**
     * @public
     * Add global CSS to the app.
     *
     * @param {string} CSSString
     */
    public injectCSS(CSSString: string): void;
    /**
     * @public
     *
     * Adds a sidebar item to the app's sidebar
     * @param {Object} options Sidebar item options
     * @param {string} options.label Text label to display in the sidebar item
     * @param {IconName} options.icon Icon class name (e.g. "ti-bug")
     * @param {string} [options.tooltip] Tooltip text shown on hover
     * @param {() => void} [options.onClick] Click handler function
     * @returns {PluginSideBarItem} The created sidebar item
     */
    public addSidebarItem({ label, icon, tooltip, onClick }: {
        label: string;
        icon: IconName;
        tooltip?: string;
        onClick?: () => void;
    }): PluginSideBarItem;
    /**
     * @public
     *
     * Adds a status bar item to the app's status bar
     * @param {Object} options Status bar item options
     * @param {string} [options.label] Text label to display in the status bar item
     * @param {string?} [options.htmlLabel] If non-null, render this HTML as-is instead of the text label
     * @param {IconName} [options.icon] Icon class name (e.g. "ti-bug")
     * @param {string} [options.tooltip] Tooltip text shown on hover
     * @param {() => void} [options.onClick] Click handler function
     * @returns {PluginStatusBarItem} The created status bar item
     */
    public addStatusBarItem({ label, htmlLabel, icon, tooltip, onClick }: {
        label?: string;
        htmlLabel?: string | null;
        icon?: IconName;
        tooltip?: string;
        onClick?: () => void;
    }): PluginStatusBarItem;
    /**
     * @public
     *
     * Shows a toaster notification to the user
     * @param {Object} options Toaster options
     * @param {string} options.title Title text for the toaster
     * @param {string} [options.message] Message text (will be rendered as text)
     * @param {string} [options.messageHTML] Message HTML (will be rendered as HTML, used instead of message if provided)
     * @param {boolean} options.dismissible Show "X" close button in top right corner
     * @param {number} [options.autoDestroyTime] Automatically fade out toaster after this many milliseconds
     * @param {string} [options.primaryLabel] Label for primary button
     * @param {string} [options.secondaryLabel] Label for secondary button
     * @param {string} [options.cancelLabel] Label for cancel link
     * @param {() => void} [options.onPrimary] Primary button click handler
     * @param {() => void} [options.onSecondary] Secondary button click handler
     * @param {() => void} [options.onCancel] Cancel link click handler
     * @param {HTMLElement} [options.targetElement] Optional element to position the toaster relative to
     * @returns {PluginToaster} The created toaster
     */
    public addToaster(options: {
        title: string;
        message?: string;
        messageHTML?: string;
        dismissible: boolean;
        autoDestroyTime?: number;
        primaryLabel?: string;
        secondaryLabel?: string;
        cancelLabel?: string;
        onPrimary?: () => void;
        onSecondary?: () => void;
        onCancel?: () => void;
        targetElement?: HTMLElement;
    }): PluginToaster;
    /**
     * @public
     *
     * Adds a command to the global command palette
     * @param {Object} options Command palette command options
     * @param {string} options.label Text label to display in the command palette
     * @param {IconName} options.icon Icon class name (e.g. "ti-bug")
     * @param {() => void} options.onSelected Function to call when the command is selected
     * @returns {PluginCommandPaletteCommand} The created command palette command
     */
    public addCommandPaletteCommand({ label, icon, onSelected }: {
        label: string;
        icon: IconName;
        onSelected: () => void;
    }): PluginCommandPaletteCommand;
    /**
     * @public
     *
     * Get the currently active/focused panel
     *
     * @returns {PluginPanel?} The active panel, or null if no panel is active
     */
    public getActivePanel(): PluginPanel | null;
    /**
     * @public
     *
     * Set the specified panel as the active/focused panel
     *
     * @param {PluginPanel} panel The panel to activate
     */
    public setActivePanel(panel: PluginPanel): void;
    /**
     * @public
     *
     * Close the specified panel
     *
     * @param {PluginPanel} panel The panel to close
     */
    public closePanel(panel: PluginPanel): void;
    /**
     * @public
     *
     * Get all currently open panels
     *
     * @returns {PluginPanel[]} Array of all open panels
     */
    public getPanels(): PluginPanel[];
    /**
     * @public
     * Register a new panel type for this plugin
     *
     * Navigate to this custom panel by calling:
     *
     * this.ui.registerCustomPanelType("my-panel-id", (panel) => {
     * 	panel.getElement().innerHTML = "Hello World";
     * });
     *
     * const newPanel = await this.ui.createPanel()
     * newPanel.navigateToCustomType("my-panel-id");
     *
     * @param {string} myPanelId - some unique ID (unique within this plugin) used to identify this panel type
     * @param {(panel: PluginPanel) => void} fn - callback to be called when the panel is loaded
     */
    public registerCustomPanelType(myPanelId: string, fn: (panel: PluginPanel) => void): void;
    /**
     * @public
     *
     * Create a new panel
     *
     * @param {Object} [options] Panel creation options
     * @param {PluginPanel} [options.afterPanel] Create the new panel after this panel
     * @returns {Promise<PluginPanel?>} The created panel, or null if creation failed
     */
    public createPanel(options?: {
        afterPanel?: PluginPanel;
    }): Promise<PluginPanel | null>;
}

/**
 * Views API for Collection Plugins
 */
class ViewsAPI {

    plugin: any;
    /**
     * @public
     * Registers a custom view type for the plugin.
     *
     * @param {string} viewName - Name or guid of the View (first tries to find by name, then by guid)
     * @param {(viewContext: PluginViewContext) => {
             *   onLoad: () => void,
             *   onRefresh: ({records, invalidatedGuids}: {records: PluginRecord[], invalidatedGuids: Set<string>?}) => void | Promise<void>,
             *   onPanelResize: () => void,
             *   onDestroy: () => void,
             *   onFocus: () => void,
             *   onBlur: () => void,
             *   onKeyboardNavigation: ({e}: {e: KeyboardEvent}) => void,
             * }} createViewHooksFn -
     * Function that returns view hook callbacks. onLoad is called before the first onRefresh. Tip: use closure scope to maintain state of your custom view.
     *
     * The `invalidatedGuids` parameter for `onRefresh()` indicates which records need to be re-rendered because they have been updated since the last onRefresh call:
     *
     * - `null`: All records need to be re-rendered (this happens on first `onRefresh` call)
     * - Empty Set: No records have changed since last refresh
     * - Set with GUIDs: Only records with those GUIDs need to be re-rendered
     *
     * You can use this parameter to optimize performance by only updating DOM nodes for records that have actually changed.
     * For example, maintain a cache of DOM nodes keyed by record GUID and only rebuild nodes for invalidated records.
     */
    public register(viewName: string, createViewHooksFn: (viewContext: PluginViewContext) => {
        onLoad: () => void;
        onRefresh: ({ records, invalidatedGuids }: {
            records: PluginRecord[];
            invalidatedGuids: Set<string> | null;
        }) => void | Promise<void>;
        onPanelResize: () => void;
        onDestroy: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onKeyboardNavigation: ({ e }: {
            e: KeyboardEvent;
        }) => void;
    }): void;
    /**
     * @public
     * Sets a function that overrides the default rendering of a board card by modifying the passed 'element' node.
     * Only triggered when the board card is dirty and needs to be re-rendered.
     *
     * @example
     * this.views.afterRenderBoardCard("Board", ({record, view, element}) => {
     *     element.innerHTML += "<b>Hello World " + view.guid + "</b>";
     * });
     *
     * @param {string?} viewName - Name or guid of the View (first tries to find by name, then by guid); null: for all views in collection
     * @param {({record, view, element, columnElement, viewContext}: {record: PluginRecord, view: PluginViewConfig, element: HTMLElement, columnElement: HTMLElement, viewContext: PluginViewContext}) => void} fn - Function that renders the board card by making changes to 'element'
     */
    public afterRenderBoardCard(viewName: string | null, fn: ({ record, view, element, columnElement, viewContext }: {
        record: PluginRecord;
        view: PluginViewConfig;
        element: HTMLElement;
        columnElement: HTMLElement;
        viewContext: PluginViewContext;
    }) => void): void;
    /**
     * @public
     * Sets a function that overrides the default rendering of a board column by modifying the passed 'columnElement' node.
     *
     * @param {string?} viewName - Name or guid of the View (first tries to find by name, then by guid); null: for all views in collection
     * @param {({view, columnElement, choiceId, viewContext}: {view: PluginViewConfig, columnElement: HTMLElement, choiceId: string?, viewContext: PluginViewContext}) => void} fn - Function that renders the board column by making changes to 'columnElement'
     */
    public afterRenderBoardColumn(viewName: string | null, fn: ({ view, columnElement, choiceId, viewContext }: {
        view: PluginViewConfig;
        columnElement: HTMLElement;
        choiceId: string | null;
        viewContext: PluginViewContext;
    }) => void): void;
    /**
     * @public
     * Sets a function that overrides the default rendering of a gallery card by modifying the passed 'element' node.
     *
     * @param {string?} viewName - Name or guid of the View (first tries to find by name, then by guid); null: for all views in collection
     * @param {({record, view, element, viewContext}: {record: PluginRecord, view: PluginViewConfig, element: HTMLElement, viewContext: PluginViewContext}) => void} fn - Function that renders the gallery card by making changes to 'element'
     */
    public afterRenderGalleryCard(viewName: string | null, fn: ({ record, view, element, viewContext }: {
        record: PluginRecord;
        view: PluginViewConfig;
        element: HTMLElement;
        viewContext: PluginViewContext;
    }) => void): void;
    /**
     * @public
     * Sets a function that overrides the default rendering of a table cell by modifying the passed 'node' node.
     *
     * @param {string?} viewName - Name or guid of the View (first tries to find by name, then by guid); null: for all views in collection
     * @param {({record, view, node, viewContext}: {record: PluginRecord, view: PluginViewConfig, prop: PluginProperty, node: HTMLElement, viewContext: PluginViewContext}) => void} fn - Function that renders the table cell by making changes to 'node'
     */
    public afterRenderTableCell(viewName: string | null, fn: ({ record, view, node, viewContext }: {
        record: PluginRecord;
        view: PluginViewConfig;
        prop: PluginProperty;
        node: HTMLElement;
        viewContext: PluginViewContext;
    }) => void): void;
    /**
     * @public
     * Sets a function that overrides the default rendering of a calendar event by modifying the passed 'element' node.
     *
     * @param {string?} viewName - Name or guid of the View (first tries to find by name, then by guid); null: for all views in collection
     * @param {({record, view, element, dateVal, viewContext}: {record: PluginRecord, view: PluginViewConfig, element: HTMLElement, dateVal: Date, viewContext: PluginViewContext}) => void} fn - Function that renders the calendar event by making changes to 'element'
     */
    public afterRenderCalendarEvent(viewName: string | null, fn: ({ record, view, element, dateVal, viewContext }: {
        record: PluginRecord;
        view: PluginViewConfig;
        element: HTMLElement;
        dateVal: Date;
        viewContext: PluginViewContext;
    }) => void): void;
}

}
export {}
