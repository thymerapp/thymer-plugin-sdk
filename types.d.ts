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
    /**
     * @public
     * Functions for real-time WebSocket messaging.
     */
    public ws: WebSocketAPI;

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
 * @property {string} [group_by_field_bucket] - for Board views when group_by_field_id is a datetime field; one of "week" | "month" | "quarter" | "year"
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
     * Sets a custom function that computes the title of records in this collection.
     * The function will be called whenever the title needs to be displayed.
     *
     * @example
     * // Simple custom title based on a property
     * this.customizeRecordTitle(({record}) => {
     *     const title = record.text("Title"); // gets the built-in title property
     *     const rating = record.prop("Rating").choiceLabel();
     *     return title + " - " + rating;
     * });
     *
     * @param {({record}: {record: PluginRecord}) => string|null} fn - Function that computes the record title.
     *   Return a string for a custom title, or null/undefined to use the default title.
     */
    public customizeRecordTitle(fn: ({ record }: {
        record: PluginRecord;
    }) => string | null): void;
    customRecordTitleFunction: (row: any) => string;
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
    /**
     * @public
     * Functions for real-time WebSocket messaging.
     */
    public ws: WebSocketAPI;

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
     * - for Board views when group_by_field_id is a datetime field; one of "week" | "month" | "quarter" | "year"
     */
    group_by_field_bucket?: string;
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
     * Create a new collection
     *
     * @returns {Promise<PluginCollectionAPI|null>}
     */
    public createCollection(): Promise<PluginCollectionAPI | null>;
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
    /**
     * @public
     * Search for items in the workspace using a query string.
     *
     * @example
     * // Search for all tasks due today
     * const results = await this.data.searchByQuery("@task @today");
     * console.log(`Found ${results.lines.length} matching lines`);
     *
     * @example
     * // Search for text
     * const results = await this.data.searchByQuery("project meeting notes");
     * for (const record of results.records) {
     *     console.log(record.getName());
     * }
     *
     * @param {string} query - The search query string (supports text search and query syntax like @task, @due, @today, etc.)
     * @param {number} [maxResults=100] - Maximum number of results to return
     * @returns {Promise<PluginSearchResult>}
     */
    public searchByQuery(query: string, maxResults?: number): Promise<PluginSearchResult>;
    #private;
}

/**
 * @public
 * A class for working with dates and times in Thymer.
 *
 * ## How DateTimes work
 *
 * A DateTime can represent:
 * - **Date only** — e.g. "January 15, 2024" (no time component)
 * - **Date + time** — e.g. "January 15, 2024 at 2:30pm"
 * - **Time only** — e.g. "2:30pm" (no date component)
 * - **Date range** — e.g. "January 15 to January 20, 2024"
 * - **Date+time range** — e.g. "January 15 at 9am to January 20 at 5pm"
 *
 * ## Timezones
 *
 * When a DateTime has a time component, that time is stored with a timezone.
 * The timezone is automatically set to the browser's local timezone and cannot
 * be changed via this API. When you read an existing DateTime that was created
 * in a different timezone, the time is converted to your browser's timezone.
 *
 * Use `setTime(null)` to remove the time component (and timezone) and keep only the date.
 * Use `setRangeEnd(endDateTime)` to create a date range.
 *
 * @example
 * // Date + time
 * const dt = new DateTime(new Date(2024, 0, 15, 14, 30));
 * record.prop("Due Date").set(dt.value());
 *
 * @example
 * // Date only (remove time component)
 * const dt = new DateTime(new Date(2024, 0, 15));
 * dt.setTime(null);
 * record.prop("Due Date").set(dt.value());
 *
 * @example
 * // Modify time on existing DateTime
 * const dt = new DateTime(new Date());
 * dt.setTime(18, 0);   // Set time to 6pm
 * dt.setTime(null);    // Remove time component
 *
 * @example
 * // Date range (multi-day event)
 * const start = DateTime.dateOnly(2024, 0, 15);
 * const end = DateTime.dateOnly(2024, 0, 20);
 * start.setRangeEnd(end); // Creates a date range from Jan 15 to Jan 20
 * record.prop("Event Period").set(start.value());
 */
class DateTime {
    /**
     * @public
     * Create a date-only DateTime (no time component, no timezone).
     *
     * @param {number} year - Full year (e.g. 2024)
     * @param {number} month - Month (0-11, where 0 = January)
     * @param {number} day - Day of month (1-31)
     * @returns {DateTime}
     *
     * @example
     * const dt = DateTime.dateOnly(2024, 0, 15); // Jan 15, 2024 (date only)
     * record.prop("Due Date").set(dt.value());
     */
    public static dateOnly(year: number, month: number, day: number): DateTime;
    /**
     * @public
     * Create a time-only DateTime (no date component).
     *
     * @param {number} hours - Hours (0-23)
     * @param {number} [minutes=0] - Minutes (0-59)
     * @param {number} [seconds=0] - Seconds (0-59)
     * @returns {DateTime}
     *
     * @example
     * const dt = DateTime.timeOnly(14, 30); // 2:30pm (time only)
     * record.prop("Reminder Time").set(dt.value());
     */
    public static timeOnly(hours: number, minutes?: number, seconds?: number): DateTime;
    /**
     * @public
     * Create a date+time DateTime from numeric parts.
     *
     * @param {number} year - Full year (e.g. 2024)
     * @param {number} month - Month (0-11, where 0 = January)
     * @param {number} day - Day of month (1-31)
     * @param {number} hours - Hours (0-23)
     * @param {number} minutes - Minutes (0-59)
     * @param {number} seconds - Seconds (0-59)
     * @returns {DateTime}
     *
     * @example
     * const dt = DateTime.fromYMDHMS(2024, 0, 15, 14, 30, 0); // Jan 15, 2024 14:30
     * record.prop("Due Date").set(dt.value());
     */
    public static dateAndTime(year: number, month: number, day: number, hours: number, minutes: number, seconds: number): DateTime;
    /**
     * @public
     * Parse a human-readable date/time string exactly like Thymer does.
     *
     * @param {string} input
     * @returns {DateTime|null}
     *
     * @example
     * // Regular date formats
     * DateTime.parseDateTimeString("2024-01-15")
     * DateTime.parseDateTimeString("1/15/2024")
     * DateTime.parseDateTimeString("aug 13")
     * DateTime.parseDateTimeString("13 aug")
     *
     * // Time formats
     * DateTime.parseDateTimeString("13:35")
     * DateTime.parseDateTimeString("1:35pm")
     * DateTime.parseDateTimeString("3pm")
     *
     * // Date and time combined
     * DateTime.parseDateTimeString("2024-01-15 14:30")
     * DateTime.parseDateTimeString("aug 13 3pm")
     *
     * // Natural language
     * DateTime.parseDateTimeString("today")
     * DateTime.parseDateTimeString("tomorrow")
     * DateTime.parseDateTimeString("monday")
     * DateTime.parseDateTimeString("monday 3pm")
     *
     * // Ranges
     * DateTime.parseDateTimeString("monday to friday")
     * DateTime.parseDateTimeString("1:35pm to 2:35pm")
     * DateTime.parseDateTimeString("last monday 3pm to today 3pm")
     */
    public static parseDateTimeString(input: string): DateTime | null;
    /**
     * @public
     * Create a new DateTime object.
     *
     * @param {Date|DateTimeValue|undefined} value -
     *   - A Date object in browser's local timezone
     *   - A DateTimeValue object
     *   - undefined to use the current date and time
     *
     * @example
     * const dt1 = new DateTime(); // Current date and time
     * const dt2 = new DateTime(new Date(2024, 0, 15)); // Specific date
     *
     * // To get a DateTime from a property, use .datetime() instead:
     * const dt3 = record.prop("Due Date").datetime();
     */
    constructor(value: Date | DateTimeValue | undefined);
    /**
     * @public
     * Get the DateTimeValue that can be used with property.set().
     *
     * @returns {DateTimeValue} - DateTimeValue object
     *
     * @example
     * const dt = new DateTime(new Date());
     * record.prop("Due Date").set(dt.value());
     */
    public value(): DateTimeValue;
    /**
     * @public
     * Convert to a JavaScript Date in the browser's local timezone.
     *
     * @returns {Date}
     */
    public toDate(): Date;
    /**
     * @public
     * Get the individual date and time parts.
     *
     * Returns (year, month, day) when the DateTime has a date component.
     * Returns (hours, minutes, seconds) when the DateTime has a time component.
     *
     * @returns {{
             *   year?: number,
             *   month?: number,
             *   day?: number,
             *   hours?: number,
             *   minutes?: number,
             *   seconds?: number
             * }}
     *
     * @example
     * const dt = DateTime.dateOnly(2024, 0, 15);
     * const parts = dt.getParts();
     * // { year: 2024, month: 0, day: 15 }
     *
     * @example
     * const dt = DateTime.timeOnly(14, 30, 0);
     * const parts = dt.getParts();
     * // { hours: 14, minutes: 30, seconds: 0 }
     *
     * @example
     * const dt = DateTime.dateAndTime(2024, 0, 15, 14, 30, 0);
     * const parts = dt.getParts();
     * // { year: 2024, month: 0, day: 15, hours: 14, minutes: 30, seconds: 0 }
     */
    public getParts(): {
        year?: number;
        month?: number;
        day?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
    };
    /**
     * @public
     * Set or remove the time component of this DateTime.
     *
     * @param {number|null} hours - Hours (0-23), or null to remove the time component
     * @param {number} [minutes=0] - Minutes (0-59)
     * @param {number} [seconds=0] - Seconds (0-59)
     *
     * @example
     * const dt = new DateTime(new Date(2024, 0, 15));
     * dt.setTime(14, 30);       // Set time to 2:30pm
     * dt.setTime(9, 0);         // Set time to 9:00am
     * dt.setTime(9, 0, 30);     // Set time to 9:00:30am
     * dt.setTime(null);         // Remove time, keep only the date
     */
    public setTime(hours: number | null, minutes?: number, seconds?: number): this;
    /**
     * @public
     * Set a date range from this DateTime to another DateTime.
     *
     * @param {DateTime|null} endDateTime - The end of the range (another DateTime object)
     *
     * @example
     * const start = DateTime.dateOnly(2024, 0, 15);
     * const end = DateTime.dateOnly(2024, 0, 20);
     * start.setRangeEnd(end); // Creates a date range from Jan 15 to Jan 20
     */
    public setRangeEnd(endDateTime: DateTime | null): this;
    /**
     * @public
     * Get the end of the date range as a new DateTime, or null if no range is set.
     *
     * @returns {DateTime|null} - A new DateTime representing the range end, or null
     *
     * @example
     * const start = DateTime.dateOnly(2024, 0, 15);
     * start.setRangeEnd(DateTime.dateOnly(2024, 0, 20));
     * const rangeEnd = start.getRangeEnd(); // DateTime for Jan 20
     *
     * const noRange = DateTime.dateOnly(2024, 0, 15);
     * noRange.getRangeEnd(); // null
     */
    public getRangeEnd(): DateTime | null;

    #private;
}

/**
 * Opaque type for datetime values. Use the DateTime class methods to work with these.
 */
type DateTimeValue = object;

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
 * "sock": "Sock",
 * "ship": "Ship",
 * "share": "Share",
 * "shirt": "Shirt",
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
 * "mouse-2": "Mouse",
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
 * "keyboard": "Keyboard",
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
 * "hanger": "Hanger",
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

const NAVIGATION_PANEL_COLLECTIONVIEW: "overview";

const NAVIGATION_PANEL_EDITOR: "edit_panel";

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
 * @typedef {PLUGIN_TASK_STATUS_NONE|
 * PLUGIN_TASK_STATUS_DONE|
 * PLUGIN_TASK_STATUS_STARTED|
 * PLUGIN_TASK_STATUS_WAITING|
 * PLUGIN_TASK_STATUS_BILLABLE|
 * PLUGIN_TASK_STATUS_IMPORTANT|
 * PLUGIN_TASK_STATUS_DISCUSS|
 * PLUGIN_TASK_STATUS_ALERT|
 * PLUGIN_TASK_STATUS_STARRED} PluginTaskStatus
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

const PLUGIN_TASK_STATUS_ALERT: "alert";

const PLUGIN_TASK_STATUS_BILLABLE: "billable";

const PLUGIN_TASK_STATUS_DISCUSS: "discuss";

const PLUGIN_TASK_STATUS_DONE: "done";

const PLUGIN_TASK_STATUS_IMPORTANT: "important";

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
const PLUGIN_TASK_STATUS_NONE: "none";

const PLUGIN_TASK_STATUS_STARRED: "starred";

const PLUGIN_TASK_STATUS_STARTED: "started";

const PLUGIN_TASK_STATUS_WAITING: "waiting";

type PluginBlockStyle = "" | "quote" | "warning" | "note" | "row";

class PluginCollectionAPI extends PluginPluginAPIBase {
    /**
     * @public
     * Get the code, config, and CSS currently used by the plugin.
     *
     * @returns {{code: string, css: string, json: PluginConfiguration}}
     */
    public getExistingCodeAndConfig(): {
        code: string;
        css: string;
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
    /**
     * @public
     * Check if this collection is a Journal plugin.
     *
     * @returns {boolean}
     */
    public isJournalPlugin(): boolean;
    /**
     * @public
     * Get a journal page record for a user on a specific date.
     * Only works on Journal plugins - returns null for other collections.
     *
     * Journal pages are created lazily - the page is automatically created when first written to.
     *
     * @param {PluginUser} user - The user whose journal to get
     * @param {DateTime} [date] - The date (defaults to today)
     * @returns {Promise<PluginRecord|null>} - The journal page or null when not a journal plugin
     *
     * @example
     * // Get all collections, find the journal, get next week's record
     * const collections = await this.data.getAllCollections();
     * const journal = collections.find(c => c.isJournalPlugin());
     * if (journal) {
     *     const user = this.data.getActiveUsers()[0];
     *     const record = await journal.getJournalRecord(user, DateTime.parseDateTimeString('next week'));
     *     if (record) {
     *         const line = await record.createLineItem(null, null, 'task');
     *         line.setSegments([{type: 'text', text: 'Plan for next week'}]);
     *     }
     * }
     */
    public getJournalRecord(user: PluginUser, date?: DateTime): Promise<PluginRecord | null>;
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
     * - collection color (index into ENUM_COLORS, null for default)
     */
    color?: number | null;
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
    /**
     * - query for Related Template shown at top of each page
     */
    related_query?: string;
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
     * Get the code, config, and CSS currently used by the plugin.
     *
     * @returns {{code: string, css: string, json: PluginConfiguration}}
     */
    public getExistingCodeAndConfig(): {
        code: string;
        css: string;
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
/**
 * Represents a line item within a record. Setters return `Promise<boolean>`.
 * Operations are processed in order, so you can await only the last one.
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
    /**
     * @public
     * Set the segments of the line item
     *
     * @param {PluginLineItemSegment[]} segments
     * @returns {Promise<boolean>} true if successful
     */
    public setSegments(segments: PluginLineItemSegment[]): Promise<boolean>;

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
     * Get the task status for task line items.
     *
     * @returns {PluginTaskStatus|null} The task status, or null if not a task
     *
     * @example
     * if (lineItem.getTaskStatus() === PLUGIN_TASK_STATUS_DONE) {
     *     console.log('Task is completed');
     * }
     */
    public getTaskStatus(): PluginTaskStatus | null;
    /**
     * @public
     * Check if this task is completed.
     *
     * @returns {boolean|null} true if completed, false if not completed, null if not a task
     *
     * @example
     * const completedTasks = lineItems.filter(item => item.isTaskCompleted() === true);
     */
    public isTaskCompleted(): boolean | null;
    /**
     * @public
     * Set the task status for task line items.
     *
     * @param {PluginTaskStatus} status - The status to set
     * @returns {Promise<boolean>} true if successful, false if not a task or invalid status
     *
     * @example
     * await lineItem.setTaskStatus(PLUGIN_TASK_STATUS_IMPORTANT);
     */
    public setTaskStatus(status: PluginTaskStatus): Promise<boolean>;
    /**
     * @public
     * Set a single meta property on the line item.
     *
     * @param {string} prop - The property key
     * @param {string|number|null} val - The value to set, or null to delete the property
     * @returns {Promise<boolean>} true if successful
     */
    public setMetaProperty(prop: string, val: string | number | null): Promise<boolean>;
    /**
     * @public
     * Set multiple meta properties on the line item.
     *
     * - null value to delete a property
     * - existing properties are overwritten
     * - properties for which no keys are provided are not touched
     *
     * @param {Record<string, any>} props - Object with property key-value pairs
     * @returns {Promise<boolean>} true if successful
     */
    public setMetaProperties(props: Record<string, any>): Promise<boolean>;
    /**
     * @public
     * Set the heading size (1-6) for heading line items.
     *
     * @param {number} size - Heading size from 1 (largest) to 6 (smallest)
     * @returns {Promise<boolean>} true if successful
     */
    public setHeadingSize(size: number): Promise<boolean>;
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
     * @returns {Promise<boolean>} true if successful
     */
    public setHighlightLanguage(language: PluginHighlightLanguage | null): Promise<boolean>;
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
     * @returns {Promise<boolean>} true if successful
     */
    public setBlockStyle(style: PluginBlockStyle | null): Promise<boolean>;
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
     * @returns {Promise<boolean>} true if successful
     */
    public setIcon(icon: string | null): Promise<boolean>;
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
     * @returns {Promise<boolean>} true if successful
     */
    public setLinkStyle(style: PluginLinkStyle | null): Promise<boolean>;
    /**
     * @public
     * Get the link style.
     *
     * @returns {PluginLinkStyle|null} Link style or null
     */
    public getLinkStyle(): PluginLinkStyle | null;
    /**
     * @public
     * Delete this line item from the record.
     *
     * Note: If the item has children, the deletion will be rejected by the backend.
     * Delete children first before deleting their parent.
     *
     * @returns {Promise<boolean>} true if deleted, false if deletion failed (e.g., has children)
     */
    public delete(): Promise<boolean>;
    /**
     * @public
     * Move this line item to a new location.
     *
     * @param {PluginLineItem|null} newParent - new parent item, or null to keep the same parent
     * @param {PluginLineItem|null} afterItem - insert after this item, or null to insert as first child
     * @returns {Promise<PluginLineItem|null>} the moved item with updated data, or null if move failed
     *
     * @example
     * // Move item to be the first child of another item
     * const movedItem = await lineItem.move(parentItem, null);
     *
     * @example
     * // Move item to be after a sibling (reorder within same parent)
     * const movedItem = await lineItem.move(null, siblingItem);
     */
    public move(newParent: PluginLineItem | null, afterItem: PluginLineItem | null): Promise<PluginLineItem | null>;
    #private;
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
     * @param {string} navigation.type Panel type - use NAVIGATION_PANEL_EDITOR ('edit_panel') to open
     *   a record in the editor, or NAVIGATION_PANEL_COLLECTIONVIEW ('overview') to open a collection view
     * @param {string?} navigation.rootId Root ID (e.g. the record guid for NAVIGATION_PANEL_EDITOR)
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
     * Navigate this panel to a user's journal page for a specific date.
     *
     * @param {PluginUser} user - The user whose journal to open
     * @param {DateTime} [date] - The date (defaults to today)
     * @returns {boolean} - True if navigation was successful, false if no journal plugin is active
     *
     * @example
     * // Navigate to a user's journal for today
     * const user = this.data.getActiveUsers()[0];
     * const panel = this.ui.getActivePanel();
     * panel.navigateToJournal(user, DateTime.parseDateTimeString('today'));
     *
     * @example
     * // Navigate to journal for last monday
     * panel.navigateToJournal(user, DateTime.parseDateTimeString('last monday'));
     */
    public navigateToJournal(user: PluginUser, date?: DateTime): boolean;
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
    #private;
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
    /**
     * @public
     * Preview a plugin with the given code, CSS, and config. Hot reloads the plugin without saving.
     *
     * @param {PluginConfiguration} conf
     * @param {string} code
     * @param {string} css
     * @param {boolean} showEditDialog - if true, open the code editor for the user to review
     */
    public previewPlugin(conf: PluginConfiguration, code: string, css: string, showEditDialog: boolean): void;
    trashPlugin(): void;
    untrashPlugin(): void;
    /**
     * @public
     * Discard preview and reload the plugin with the saved config and code.
     */
    public discardPreviewPlugin(): void;
    /**
     * @public
     * Save and reload the plugin with the given code and config.
     *
     * Plugin is reloaded immediately; resolves when backend persistence completes.
     * After save UI updates and component reloads (when necessary) are scheduled but not
     * yet processed.
     *
     * @param {PluginConfiguration} conf
     * @param {string} code
     * @returns {Promise<boolean>}
     */
    public savePlugin(conf: PluginConfiguration, code: string): Promise<boolean>;
    /**
     * @public
     * Save only the plugin configuration (leave code and CSS unchanged)
     *
     * @param {PluginConfiguration} conf
     * @returns {Promise<boolean>}
     */
    public saveConfiguration(conf: PluginConfiguration): Promise<boolean>;
    /**
     * @public
     * Save only the plugin code (leave configuration and CSS unchanged)
     *
     * @param {string} code
     * @returns {Promise<boolean>}
     */
    public saveCode(code: string): Promise<boolean>;
    /**
     * @public
     * Save only the plugin CSS (leave code and configuration unchanged)
     *
     * @param {string} css
     * @returns {Promise<boolean>}
     */
    public saveCSS(css: string): Promise<boolean>;


    #private;
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
     * Get the label of the choice (enum) value, or null if a choice value is not available.
     *
     * @example
     * const statusLabel = record.prop("Status").choiceLabel(); // "In Progress"
     * const statusId = record.prop("Status").choice(); // "in_progress"
     *
     * @returns {string?}
     */
    public choiceLabel(): string | null;
    /**
     * @public
     * Get all available choices for this choice/enum property field.
     * Returns null if this is not a choice-type property.
     *
     * @returns {PropertyChoiceOption[]?}
     */
    public choices(): PropertyChoiceOption[] | null;
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
     * Get the property value as a JavaScript Date object (in your browser's local timezone),
     * or null if a datetime value is not available. For date ranges, returns the start date only.
     *
     * @returns {Date?}
     */
    public date(): Date | null;
    /**
     * @public
     * Get the property value as a DateTime object, or null if a datetime value is not available.
     *
     * @example
     * const dt = record.prop("Due Date").datetime();
     * if (dt) {
     *     dt.setTime(null); // Remove time, keep date only
     *     record.prop("Due Date").set(dt.value());
     * }
     *
     * @returns {DateTime?}
     */
    public datetime(): DateTime | null;
    #private;
}

class PluginRecord {

    /** @type {string} */
    guid: string;


    /**
     * @public
     * Get a raw markdown string for this record, including properties as YAML frontmatter. Please note that the
     * resulting Markdown is still fairly basic, and not all items or segments are converted (and some features don't
     * have a good Markdown equivalent), so don't use this for purposes such as backup (use the Export feature for that
     * instead). Images/Attachments are not included either.
     *
     * This is still experimental and may change in the future. Pass {experimental: true} as parameter to use it.
     *
     * @example
     * const result = await record.getAsMarkdown({experimental: true});
     * if (result) {
     *     console.log(result.filename, result.content);
     * }
     *
     * @param {{experimental?: boolean}} options
     * @returns {Promise<{filename: string, content: string}?>} - null on error
     */
    public getAsMarkdown(options?: {
        experimental?: boolean;
    }): Promise<{
        filename: string;
        content: string;
    } | null>;
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
     * @param {PluginLineItemSegment[]?} segments
     * @param {PluginLineItemProps?} properties
     * @returns {Promise<PluginLineItem?>} - returns new line item, null when failed
     */
    public createLineItem(parentItem: PluginLineItem | null, afterItem: PluginLineItem | null, type: PluginLineItemType, segments: PluginLineItemSegment[] | null, properties: PluginLineItemProps | null): Promise<PluginLineItem | null>;
    /**
     * @public
     * Insert content parsed from an HTML string into this record.
     *
     * @param {string} html - HTML string to parse and insert
     * @param {PluginLineItem?} parentItem - null: use record as parent
     * @param {PluginLineItem?} afterItem - null: insert as first child
     * @returns {Promise<boolean>} true if all operations succeeded
     */
    public insertFromHTML(html: string, parentItem: PluginLineItem | null, afterItem: PluginLineItem | null): Promise<boolean>;
    /**
     * @public
     * Insert content parsed from a Markdown string into this record.
     *
     * @param {string} markdown - Markdown string to parse and insert
     * @param {PluginLineItem?} parentItem - null: use record as parent
     * @param {PluginLineItem?} afterItem - null: insert as first child
     * @returns {Promise<boolean>} true if all operations succeeded
     */
    public insertFromMarkdown(markdown: string, parentItem: PluginLineItem | null, afterItem: PluginLineItem | null): Promise<boolean>;
    /**
     * @public
     * Insert content from a plain text string into this record.
     *
     * @param {string} text - Plain text string to parse and insert
     * @param {PluginLineItem?} parentItem - null: use record as parent
     * @param {PluginLineItem?} afterItem - null: insert as first child
     * @returns {Promise<boolean>} true if all operations succeeded
     */
    public insertFromPlainText(text: string, parentItem: PluginLineItem | null, afterItem: PluginLineItem | null): Promise<boolean>;
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
     * @param {string} name
     * @returns {number?}
     */
    public number(name: string): number | null;
    /**
     * @public
     * Shorthand for prop(name).date()
     *
     * @example
     * const startDate = record.date("Start Date");
     *
     * @param {string} name
     * @returns {Date?}
     */
    public date(name: string): Date | null;
    /**
     * @public
     * Shorthand for prop(name).datetime()
     *
     * @example
     * const dt = record.datetime("Due Date");
     *
     * @param {string} name
     * @returns {DateTime?}
     */
    public datetime(name: string): DateTime | null;
    /**
     * @public
     * Shorthand for prop(name).text()
     *
     * @example
     * const name = record.text("Name");
     *
     * @param {string} name
     * @returns {string?}
     */
    public text(name: string): string | null;
    /**
     * @public
     * Shorthand for prop(name).choice()
     *
     * @example
     * const status = record.choice("Status");
     *
     * @param {string} name
     * @returns {string?}
     */
    public choice(name: string): string | null;
    #private;
}

type PluginSearchResult = {
    /**
     * - Error message if search failed, empty string otherwise
     */
    error: string;
    /**
     * - Records (pages/documents) that matched the query
     */
    records: PluginRecord[];
    /**
     * - Individual line items that matched the query
     */
    lines: PluginLineItem[];
};

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

type PluginTaskStatus = "none" | "done" | "started" | "waiting" | "billable" | "important" | "discuss" | "alert" | "starred";

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
    #private;
}

class PluginViewConfig {

    /** @type {string} */
    name: string;
    /** @type {string} */
    guid: string;
    /** @type {PluginViewType} */
    type: PluginViewType;
    #private;
}

class PluginViewContext {

    /** @type {string} - unique local ID for the instance of this view (i.e. stable while the view is open in the UI) */
    instanceId: string;

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
    #private;
}

/**
 * Available view types for plugins.
 */
type PluginViewType = CollectionViewType;

type PluginWebSocketMessage = {
    /**
     * - Custom message type defined by plugin
     */
    type: string;
    /**
     * - Message payload
     */
    data: any;
    /**
     * - Sender's user GUID (set automatically on receive)
     */
    fromUserGuid?: string;
    /**
     * - Sender's plugin GUID (set automatically on receive)
     */
    fromPluginGuid?: string;
};

type PluginWebSocketMessageCallback = (msg: PluginWebSocketMessage) => void;

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
    /**
     * @public
     *
     * Sets a function that populates the choices shown in a choice/enum dropdown.
     * The function will be called when the dropdown is opened for editing.
     * You can filter, add, or completely replace the default choices.
     *
     * @example
     * this.properties.populateChoices("Status", ({record, prop, defaultChoices}) => {
     *     // Filter: hide choices with a star icon
     *     const filtered = defaultChoices.filter(c => c.icon != 'ti-star');
     *
     *     // Add: include a dynamic option
     *     return [...filtered, {id: "custom", label: "Custom Option", icon: "ti-star", active: true, color: "0"}];
     * });
     *
     * @param {string} name - Name or guid of the Property (first tries to find by name, then by guid)
     * @param {({record, prop, defaultChoices}: {record: PluginRecord?, prop: PluginProperty, defaultChoices: PropertyChoiceOption[]}) => PropertyChoiceOption[]} fn - Function that returns the choices to show in the dropdown
     */
    public populateChoices(name: string, fn: ({ record, prop, defaultChoices }: {
        record: PluginRecord | null;
        prop: PluginProperty;
        defaultChoices: PropertyChoiceOption[];
    }) => PropertyChoiceOption[]): void;
    #private;
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
    /**
     * - For PROP_TYPE_RECORD: optional collection guid to filter records by. If set, only records from that collection are shown. If the collection doesn't exist or is trashed, no records are shown.
     */
    filter_colguid?: string;
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
    #private;
}

/**
 * Views API for Collection Plugins
 */
class ViewsAPI {

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
    #private;
}

/**
 * @typedef {Object} PluginWebSocketMessage@typedef {Object} PluginWebSocketMessage
 * @property {string} type - Custom message type defined by plugin
 * @property {any} data - Message payload
 * @property {string} [fromUserGuid] - Sender's user GUID (set automatically on receive)
 * @property {string} [fromPluginGuid] - Sender's plugin GUID (set automatically on receive)
 */
/**
 * @typedef {(msg: PluginWebSocketMessage) => void} PluginWebSocketMessageCallback
 */
/**
 * WebSocket API for real-time messaging between clients in a workspace.
 *
 * Messages are broadcast to all clients in the workspace via WebSocket.
 * This is fire-and-forget: no delivery guarantees, messages may be dropped
 * by rate limiting, and offline clients won't receive messages.
 *
 * You can listen to websocket messages sent by other plugins. If you only want
 * to handle messages from your own plugin, filter by `msg.fromPluginGuid === this.getGuid()`.
 *
 * @example
 * // Send a message to all other clients
 * this.ws.broadcast({
 *     type: "announce",
 *     data: { text: "Hello from my plugin!" }
 * });
 *
 * // Send to specific users
 * this.ws.send({
 *     type: "toast",
 *     data: { text: "Hello!" }
 * }, this.data.getActiveUsers());
 *
 * // Listen for incoming messages. You also receive messages sent by other plugins!
 * const unsubscribe = this.ws.onMessage((msg) => {
 *     if (msg.fromPluginGuid === this.getGuid()) {
 *         console.log(`Got ${msg.type} from ${msg.fromUserGuid}:`, msg.data);
 *     } else {
 *         console.log(`Another plugin sent ${msg.type}:`, msg.data);
 *     }
 * });
 *
 * // Later, to stop listening:
 * unsubscribe();
 */
class WebSocketAPI {

    /**
     * @public
     * Broadcast a message to all other clients in the workspace.
     *
     * This is fire-and-forget: no delivery guarantees.
     *
     * @param {PluginWebSocketMessage} message - Message to send
     *
     * @example
     * this.ws.broadcast({
     *     type: "announce",
     *     data: { text: "Hello from my plugin!" }
     * });
     */
    public broadcast(message: PluginWebSocketMessage): void;
    /**
     * @public
     * Send a message, optionally to specific users.
     *
     * If toUserGuids is null or empty, broadcasts to all clients.
     * If toUserGuids is provided, only those users will receive the message.
     *
     * @param {PluginWebSocketMessage} message - Message to send
     * @param {PluginUser[]?} toUsers - Optional list of recipient users
     *
     * @example
     * // Send to specific users
     * const admins = this.data.getActiveUsers().filter(u => u.isAdmin());
     * this.ws.send({
     *     type: "dm",
     *     data: { text: "Hello!" }
     * }, admins);
     */
    public send(message: PluginWebSocketMessage, toUsers?: PluginUser[] | null): void;
    /**
     * @public
     * Register a callback to receive incoming messages.
     *
     * Returns an unsubscribe function to stop listening.
     * Listeners are automatically cleaned up when the plugin is unloaded.
     *
     * @param {PluginWebSocketMessageCallback} callback - Function called when a message is received
     * @returns {() => void} Unsubscribe function
     *
     * @example
     * const unsubscribe = this.ws.onMessage((msg) => {
     *     if (msg.fromPluginGuid !== this.getGuid()) return;
     *     if (msg.type === "announce") console.log(msg.data?.text);
     * });
     *
     * // Later, to stop listening:
     * unsubscribe();
     */
    public onMessage(callback: PluginWebSocketMessageCallback): () => void;
    #private;
}

}
export {}
