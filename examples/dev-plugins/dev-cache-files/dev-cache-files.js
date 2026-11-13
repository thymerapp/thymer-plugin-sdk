/**
 * This is an example of how plugins can be used to add developer tools/features to Thymer. 
 * 
 * This example plugin adds a new "Cache Files" build command, which can be used to "download" (cache) the contents 
 * of your Thymer workspace as flat files into a local "cache" directory. This could be useful for testing for example,
 * if you want to test actions of a plugin against the changes made to the workspace, or if you want to use Claude 
 * Code to chat with your notes.
 * 
 * Limitations:
 * - As this is just for demo purposes, the cache isn't very comprehensive. It doesn't contain any attachments or 
 *   images at the moment, rewrites all cache files even if they haven't changed, and just exports a very basic subset 
 *   of the contents into basic Markdown (so don't rely on it for backup purposes or production use).
 *   
 * - A user-friendly way to make Claude Code (or other cli tools) interface directly with Thymer without the need 
 *   for any debug envrionments or dev tools is still on the roadmap, so this is just meant as a preview of what's to come.
 * 
 * Install & Usage:
 * - In Thymer, open Plugins -> Install from URL and paste the Raw URL of this directory's thymer-plugin.json.
 * - Choose Open Draft -> Preview -> Save to install the browser-side exporter.
 * - Alternatively, create a Global Plugin and paste export-plugin.js in Custom Code and export-plugin.json in Configuration, then Preview -> Save.
 * - See this SDK's README.md "Quick Start" section on how to start the debugger
 * - Run 'npm run dev:cache-files' to cache the contents of your Thymer workspace as flat files into the "cache" directory.
 * - cache/*.md will now contain notes from your Thymer workspace.
 * - For trying out a demo of using the cached files with Claude Code, copy CLAUDE.md to the cache directory and use it as a context for your questions.
 */
import CDP from 'chrome-remote-interface';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = 'cache';

console.log('🔗 Connecting to Chrome DevTools...');

let chrome;
try {
	chrome = await CDP();
} catch (error) {
	console.error('❌ Cannot connect to Chrome debugger');
	console.error('Make sure Chrome is running with --remote-debugging-port=9222');
	process.exit(1);
}

const tab = chrome;
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

// Phase 2: Check if window.debugContents exists and can be called
try {
	const checkResult = await tab.Runtime.evaluate({
		expression: 'typeof window.debugContents === "function"'
	});
	
	if (!checkResult.result.value) {
		console.error('❌ window.debugContents is not available');
		console.error('');
		console.error('Please install the dev-cache-files global plugin first:');
		console.error('  1. In Thymer, open the Command Palette and select "Plugins"');
		console.error('  2. Choose "Install from URL" and paste the Raw URL of examples/dev-plugins/dev-cache-files/thymer-plugin.json');
		console.error('  3. Choose Open Draft -> Preview -> Save');
		console.error('  See examples/README.md for setup and manual installation instructions.');
		console.error('');
		await chrome.close();
		process.exit(1);
	}
	
	console.log('✅ debugContents function found');
} catch (error) {
	console.error('❌ Error checking for debugContents:', error.message);
	await chrome.close();
	process.exit(1);
}

// Phase 3: Call debugContents and retrieve the files
console.log('📥 Fetching workspace contents...');

try {
	const result = await tab.Runtime.evaluate({
		expression: 'window.debugContents()',
		awaitPromise: true,
		returnByValue: true
	});
	
	if (result.exceptionDetails) {
		console.error('❌ Error calling debugContents:', result.exceptionDetails.text);
		await chrome.close();
		process.exit(1);
	}
	
	const data = result.result.value;
	
	if (!data || !Array.isArray(data.files)) {
		console.error('❌ Invalid response from debugContents');
		console.error('Expected: { files: [{filename, content}, ...] }');
		console.error('Received:', JSON.stringify(data, null, 2));
		await chrome.close();
		process.exit(1);
	}
	
	const files = data.files;
	console.log(`✅ Received ${files.length} file(s) from workspace`);
	
	// Phase 4: Create cache directory if it doesn't exist
	if (!fs.existsSync(CACHE_DIR)) {
		fs.mkdirSync(CACHE_DIR, { recursive: true });
		console.log(`📁 Created cache directory: ${CACHE_DIR}/`);
	} else {
		console.log(`📁 Using existing cache directory: ${CACHE_DIR}/`);
	}
	
	// Phase 5: Write each file to the cache directory
	for (const file of files) {
		if (!file.filename || typeof file.content === 'undefined') {
			console.warn(`⚠️ Skipping invalid file entry:`, file);
			continue;
		}
		
		const filePath = path.join(CACHE_DIR, file.filename);
		
		// Create subdirectories if the filename contains path separators
		const fileDir = path.dirname(filePath);
		if (fileDir !== CACHE_DIR && !fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, { recursive: true });
		}
		
		fs.writeFileSync(filePath, file.content, 'utf8');
		console.log(`  ✅ ${file.filename}`);
	}
	
	console.log('');
	console.log(`🎉 Successfully cached ${files.length} file(s) to ${CACHE_DIR}/`);
	
} catch (error) {
	console.error('❌ Error fetching workspace contents:', error.message);
	await chrome.close();
	process.exit(1);
}

await chrome.close();
process.exit(0);

