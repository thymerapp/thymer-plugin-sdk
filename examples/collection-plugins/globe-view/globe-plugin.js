/**
 * (See the plugin-sdk's README.md for more details on how to install and test these examples.)
 * 
 * Example plugin that shows a 3D globe visualization for notes in a "Trip" collection.
 * This plugin demonstrates how to register a custom view type which is a bit more complex than a simple list.
 * 
 * Try it out by installing the plugin (see README.md), and then creating a few notes in the "Trip" collection with
 * the title being the name of a country. The trip notes overview will now show on an interactive 3D globe.
 * 
 * It demonstrates:
 * - Registering a custom view type
 * - Use the viewContext to access the collection records and open records in other panels
 * - Load external scripts
 * - Include assets in the plugin package
 * 
 * Limitations of this demo example:
 * - For simplicity, this demo assumes that the name of the country is the same as the title of the note in the 
 *   collection (you could also add a property "Country" to the collection, and then use .text("Country") on each record 
 *   to get the name of the country).
 * - We always draw a dark background so it won't look great on all themes
 * - We're not mapping country names to their corresponding geo names, so it will only work for simply country names
 * - Globe.js is mostly vibe coded so it's not very well documented or efficient
 * - Using low-res earth texture
 */

import { InteractiveGlobe } from "./globe.js";

const COUNTRY_GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';
const THREE_JS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
const ORBIT_CONTROLS_URL = 'https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/controls/OrbitControls.js';


class Plugin extends CollectionPlugin {

	/**
	 * Helper function to load a script and wait for it to be fully available
	 * @param {string} src - The script source URL
	 * @param {string} globalVar - The global variable path to check for availability (e.g., "THREE" or "THREE.OrbitControls")
	 * @param {string} scriptName - Human-readable name for error messages
	 * @returns {Promise<void>}
	 */
	async loadScript(src, globalVar, scriptName) {
		return new Promise((resolve, reject) => {
			// Helper function to check if a nested property exists
			const checkGlobalVar = (/** @type {string} */ path) => {
				const parts = path.split('.');
				let current = globalThis;
				
				for (const part of parts) {
					if (current && typeof current === 'object' && part in current) {
						// @ts-ignore
						current = current[part];
					} else {
						return false;
					}
				}
				return current !== undefined;
			};

			// Check if already loaded
			if (checkGlobalVar(globalVar)) {
				resolve();
				return;
			}

			const script = document.createElement('script');
			script.src = src;
			script.async = true;

			// Set up error handling
			script.onerror = () => {
				reject(new Error(`Failed to load ${scriptName} from ${src}`));
			};

			// Set up success handling with polling
			const checkAvailability = () => {
				if (checkGlobalVar(globalVar)) {
					resolve();
				} else {
					// Poll every 10ms until the global variable is available
					setTimeout(checkAvailability, 10);
				}
			};

			script.onload = () => {
				// Start polling for availability
				checkAvailability();
			};

			// Add to document
			document.head.appendChild(script);
		});
	}

	onLoad() {

		this.views.register("Map", (viewContext) => {
			const $element = viewContext.getElement();

			$element.innerHTML = /* html */ `
				<div id="globe-container">
					<div id="hover-label"></div>
				</div>
				<style>
					#globe-container { 
						background: #0a0a1a; 
						width: calc(100% + 50px);
						height: 100%;
						min-height: 700px;
						display: flex;
						position: relative;
						cursor: default;
						margin: -20px;
					}
					#hover-label {
						position: fixed;
						background: #0c1014;
						color: white;
						padding: 5px 10px;
						border-radius: 3px;
						pointer-events: none;
						font-family: Arial, sans-serif;
						font-size: 14px;
						display: none;
						z-index: 1000;
					}
				</style>
			`;

			const $container = $element.querySelector('#globe-container');
			if (!$container) {
				throw new Error("Globe container not found");
			}

			/** @type {InteractiveGlobe?} */
			let globe = null;
			/** @type {string[]} */
			let countries = [];

			function initGlobe() {
				/** @type {any} */
				// @ts-ignore
				const THREE = globalThis.THREE;
				globe = new InteractiveGlobe(/** @type {HTMLElement} */ ($container), (countryName) => {
					// Find back the record by the country name (we could also have passed the guid along with the 
					// country name to the globe class, but this demonstrates another way to use viewContext).
					const record = viewContext.getAllRecords().find(r => r.getName() == countryName);
					if (record) {
						viewContext.openRecordInOtherPanel(record.guid);
					}
				}, THREE, COUNTRY_GEOJSON_URL);
				refreshGlobe();
			}

			function refreshGlobe() {
				if (globe) {
					globe.showCountries(countries);
				}
			}

			return {
				onLoad: async () => {
					try {
						// Load Three.js first
						await this.loadScript(
							THREE_JS_URL,
							'THREE',
							'Three.js'
						);

						// Then load OrbitControls
						await this.loadScript(
							ORBIT_CONTROLS_URL,
							'THREE.OrbitControls',
							'OrbitControls'
						);

						if (viewContext.isDestroyed()) {
							// The view was destroyed while we were waiting for scripts to load, cancel.
							return;
						}

						// Initialize the globe once both scripts are loaded
						initGlobe();

					} catch (error) {
						console.error('Failed to load required scripts:', error);
						this.ui.addToaster({
							title: "Unable to load",
							message: `Failed to load required libraries: ${String(error)}. The globe visualization will not work.`,
							dismissible: true,
							autoDestroyTime: 5000
						});
					}
				},
				onRefresh: ({records, invalidatedGuids}) => {
					for (const record of records) {
						const title = record.getName();
						if (title) {
							countries.push(title);
						}
					}

					refreshGlobe();
				},
				onPanelResize: () => {
					if (globe) {
						globe.onWindowResize();
					}
				},
				onDestroy: () => {
					globe = null;
				},
				onFocus: () => {
				},
				onBlur: () => {
				},
				onKeyboardNavigation: ({e}) => {
				},
			}
		});

	}
}
