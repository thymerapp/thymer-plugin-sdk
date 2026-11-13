/**
 * This script is used to build the plugin.js file and the plugin.json file ('npm run build'). When using 'npm run dev',
 * it will watch for changes in the plugin.js file and the plugin.json file, and push them to Thymer over a Chrome
 * debugger connection to use hot-reload.
 */
import esbuild from 'esbuild';
import chokidar from 'chokidar';
import CDP from 'chrome-remote-interface';
import fs from 'fs';

const OUT = 'dist/plugin.js';
const OUT_JSON = 'plugin.json';
const once = process.argv.includes('--once');

const buildCtx = await esbuild.context({
	entryPoints : ['plugin.js'],
	bundle      : true,
	format      : 'iife',           // one self-executing bundle
	globalName  : 'plugins',        // expose the class on globalThis.plugins
	keepNames   : true,             // keep class name "Plugin"
	sourcemap   : once ? false : 'inline',
	loader      : { '.css':'text', '.png':'dataurl', '.avif':'dataurl', '.svg':'dataurl', '.jpg':'dataurl', '.jpeg':'dataurl', '.gif':'dataurl' },
	outfile     : OUT,
	write       : true
});

const printCode = process.argv.includes('--print-code');

if (once) { await buildCtx.rebuild(); process.exit(0); }

/* -------- live dev -------- */
await buildCtx.watch();
console.log('🛠  Watching for changes...');

const chrome = await CDP();
const tab    = chrome;
console.log('🪄 Connected to Chrome DevTools (9222)');

// Phase 1: Check if we can access Chrome debugger at all
try {
	await tab.Runtime.evaluate({ expression: '1+1' });
	console.log('✅ Chrome debugger connection verified');
} catch (error) {
	console.error('❌ Cannot connect to Chrome debugger');
	console.error('Make sure Chrome is running with --remote-debugging-port=9222');
	process.exit(1);
}

// Phase 2: Check if window.debugPing exists and returns "pong"
try {
	const result = await tab.Runtime.evaluate({
		expression: 'window.debugPing()',
		awaitPromise: true
	});
	
	if (result.result.type === 'object' && result.result.objectId) {
		const properties = await tab.Runtime.getProperties({
			objectId: result.result.objectId
		});
		
		const answer = properties.result.find(prop => prop.name === 'answer')?.value?.value;
		const hotReloadEnabled = properties.result.find(prop => prop.name === 'hotReloadEnabled')?.value?.value;
		const name = properties.result.find(prop => prop.name === 'name')?.value?.value;
		const isGlobal = properties.result.find(prop => prop.name === 'isGlobal')?.value?.value;
		
		if (answer !== "pong") {
			console.error('❌ App not loaded in debugger instance');
			console.error('Please open your app in the Chrome instance with debugging enabled');
			process.exit(1);
		}
		console.log('✅ App loaded in debugger instance');
		
		// Phase 3: Check if hot reload is enabled
		if (!hotReloadEnabled) {
			console.log('⚠️ Please enable Hot Reload for one of your plugins:');
			console.log(' - In Thymer, open the Command Palette and select "Plugins"');
			console.log(' - Find the Global Plugin or Collection you want to enable Hot Reload for, click "Edit Code"');
			console.log(' - In the code editor dialog, select the "Developer Tools" tab');
			console.log(' - Click the "Enable Plugin Hot Reload" button.');
			
			process.exit(1);
		} else {
			console.log(`✅ Hot Reload enabled for '${name}' ${isGlobal ? '(Global Plugin)' : '(Collection Plugin)'}`);
			console.log('✅ You can now edit and save the plugin.js file and the plugin.json file, and they will be pushed to Thymer');
		}
	} else {
		console.error('❌ App not loaded in debugger instance');
		console.error('Please open your app in the Chrome instance with debugging enabled');
		console.error('If you still can\'t connect, make sure you don\'t have the Chrome Developer Tools open within your debug Chrome window.')
		process.exit(1);
	}
} catch (error) {
	console.error('❌ App not loaded in debugger instance');
	console.error('Please open your app in the Chrome instance with debugging enabled');
	process.exit(1);
}

/**
* @param {string} jsCodeStr 
* @param {string} jsonConfStr 
*/
function push(jsCodeStr, jsonConfStr) {
	console.log('⚡ Pushing code and config to Thymer plugin...');
	
	if (printCode) {
		console.log('\n📄 JavaScript Code:');
		console.log('='.repeat(50));
		console.log(jsCodeStr);
		console.log('='.repeat(50));
		console.log('\n📄 JSON Configuration:');
		console.log('='.repeat(50));
		console.log(jsonConfStr);
		console.log('='.repeat(50));
		console.log('\n');
	}
	
	const codeWithName = jsCodeStr + '\n//# sourceURL=thymer-plugin.js';
	const expr = `window.refreshPlugin(${JSON.stringify(codeWithName)}, ${JSON.stringify(jsonConfStr)})`;  
	tab.Runtime.evaluate({expression: expr, awaitPromise: true})
	.then((result) => {
		if (result.result.type === 'object' && result.result.objectId) {
			return tab.Runtime.getProperties({
				objectId: result.result.objectId
			});
		}
		throw new Error('Unexpected result type from refreshPlugin');
	})
	.then((properties) => {
		const success = properties.result.find(prop => prop.name === 'success')?.value?.value;
		const error = properties.result.find(prop => prop.name === 'error')?.value?.value;
		
		if (success) {
			console.log('✅ Thymer plugin reloaded successfully');
		} else {
			console.error('❌ Plugin reload failed:', error || 'Unknown error');
		}
	})
	.catch(console.error);
}

// Watch both files and push when either changes
chokidar.watch([OUT, OUT_JSON]).on('change', (filePath) => {
	console.log(`📝 File changed: ${filePath}`);
	
	try {
		const jsCodeStr = fs.readFileSync(OUT, 'utf8');
		const jsonConfStr = fs.readFileSync(OUT_JSON, 'utf8');
		push(jsCodeStr, jsonConfStr);
	} catch (error) {
		console.error('❌ Error reading files:', error);
	}
});
