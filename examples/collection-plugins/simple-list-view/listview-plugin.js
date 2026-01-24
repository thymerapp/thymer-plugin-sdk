/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
* 
* Example plugin to show a simple list of records as a custom view.
* 
* Try it out by installing the plugin (see README.md), and then creating a few notes in the collection.
* 
* It demonstrates:
* - Registering a custom view type
* - Using keyboard events
* - Using the viewContext to open records in other panels
*/

class Plugin extends CollectionPlugin {

    onLoad() {
        // Register a custom view for the specified view name
        this.views.register("My View", (viewContext) => {
            // State variables for the custom view
            let selectedIndex = 0;
            /** @type {PluginRecord[]} */
            let records = [];
            /** @type {HTMLElement?} */
            let listContainer = null;

            // Function to update visual selection
            const updateSelection = () => {
                if (!listContainer) return;
                const items = listContainer.querySelectorAll('.custom-list-item');
                items.forEach((item, idx) => {
                    item.classList.toggle('selected', idx === selectedIndex);
                });

                // Focus the selected item and scroll into view
                const selectedItem = listContainer.querySelector(`[data-index="${selectedIndex}"]`);
                if (selectedItem) {
                    /** @type {HTMLElement} */(selectedItem).focus();
                    selectedItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            };

            // Function to open the currently selected record
            const openSelectedRecord = () => {
                if (records.length > 0 && selectedIndex >= 0 && selectedIndex < records.length) {
                    viewContext.openRecordInOtherPanel(records[selectedIndex].guid);
                }
            };

            // Function to render the list
            const renderList = () => {
                const element = viewContext.getElement();
                element.innerHTML = "";

                if (records.length === 0) {
                    element.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 40px;">No records found</div>';
                    return;
                }

                listContainer = document.createElement('div');
                listContainer.className = 'custom-list-view';
                listContainer.tabIndex = 0;

				let iconName = this.getConfiguration().icon;

                records.forEach((record, index) => {
                    const listItem = document.createElement('div');
                    listItem.className = 'custom-list-item';
                    listItem.tabIndex = 0;
                    listItem.setAttribute('data-record-guid', record.guid);
                    listItem.setAttribute('data-index', index.toString());

					const iconSpan = this.ui.createIcon(iconName);
					iconSpan.classList.add('custom-list-item-icon');
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'custom-list-item-name';
                    nameSpan.textContent = record.getName();
                    
                    listItem.appendChild(iconSpan);
                    listItem.appendChild(nameSpan);

                    // Click handler to open record in new panel
                    listItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        viewContext.openRecordInOtherPanel(record.guid);
                    });

                    // Focus handler to update selection
                    listItem.addEventListener('focus', () => {
                        selectedIndex = index;
                        updateSelection();
                    });

                    if (listContainer) {
                        listContainer.appendChild(listItem);
                    }
                });

                element.appendChild(listContainer);

                // Set initial focus to first item
                setTimeout(() => {
                    if (listContainer) {
                        const firstItem = listContainer.querySelector('.custom-list-item');
                        if (firstItem) {
                            /** @type {HTMLElement} */(firstItem).focus();
                        }
                    }
                }, 0);
            };

            return {
                onLoad: () => {
                    // Initialize the view when it's first loaded
                    const element = viewContext.getElement();
                    element.style.padding = "20px";
                    element.style.fontFamily = "var(--font-family)";

                    // Add CSS for the custom list view
                    this.ui.injectCSS(/* css */`
                        .custom-list-view {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        }
                        .custom-list-item {
                            display: flex;
                            align-items: center;
                            padding: 12px 16px;
                            background: var(--bg-default);
                            border: 1px solid var(--border-default);
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            user-select: none;
                        }
                        .custom-list-item:hover {
                            background: var(--bg-hover);
                            border-color: var(--border-hover);
                        }
                        .custom-list-item.selected {
                            background: var(--enum-blue-bg);
                            color: var(--enum-blue-fg);
                            border-color: var(--enum-blue-border);
                        }
                        .custom-list-item:focus {
                            outline: 2px solid var(--enum-blue-border);
                            outline-offset: 2px;
                        }
                        .custom-list-item-name {
                            font-weight: 500;
                            flex: 1;
                        }
                        .custom-list-item-icon {
                            margin-right: 12px;
                            color: var(--text-muted);
                        }
                    `);
                },

                onRefresh: ({records: newRecords}) => {
                    // Update records and re-render
                    records = newRecords;
                    selectedIndex = 0;
                    renderList();
                },

                onPanelResize: () => {
                    // Handle panel resize if needed
                },

                onDestroy: () => {
                    // Cleanup when view is destroyed
                    records = [];
                    listContainer = null;
                    selectedIndex = 0;
                },

                onFocus: () => {
                    // Handle focus events - focus the selected item
                    if (listContainer && records.length > 0) {
                        const selectedItem = listContainer.querySelector(`[data-index="${selectedIndex}"]`);
                        if (selectedItem) {
                            /** @type {HTMLElement} */(selectedItem).focus();
                        }
                    }
                },

                onBlur: () => {
                    // Handle blur events
                },

                onKeyboardNavigation: ({e}) => {
                    // Handle keyboard navigation events
                    if (!listContainer || records.length === 0) return;

                    e.preventDefault();

                    switch (e.key) {
                        case 'Enter':
                        case ' ':
                            // Open the currently selected record
                            openSelectedRecord();
                            break;

                        case 'ArrowDown':
                            // Move to next item
                            selectedIndex = Math.min(selectedIndex + 1, records.length - 1);
                            updateSelection();
                            break;

                        case 'ArrowUp':
                            // Move to previous item
                            selectedIndex = Math.max(selectedIndex - 1, 0);
                            updateSelection();
                            break;

                        case 'Home':
                            // Move to first item
                            selectedIndex = 0;
                            updateSelection();
                            break;

                        case 'End':
                            // Move to last item
                            selectedIndex = records.length - 1;
                            updateSelection();
                            break;

                        case 'PageDown':
                            // Move down by page (10 items)
                            selectedIndex = Math.min(selectedIndex + 10, records.length - 1);
                            updateSelection();
                            break;

                        case 'PageUp':
                            // Move up by page (10 items)
                            selectedIndex = Math.max(selectedIndex - 10, 0);
                            updateSelection();
                            break;
                    }
                },
            };
        });
    }
}
