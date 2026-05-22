/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
* 
* Example plugin to show a super simple example of a plugin adding a clock to the status bar.
* 
* Try it out by installing the plugin (see README.md).
* 
*/

class Plugin extends AppPlugin {
	
	onLoad() {
		this.addLiveTimeToStatusBar();
	}

	addLiveTimeToStatusBar() {
		const updateTime = () => {
			const now = new Date();
			const timeString = now.toLocaleTimeString('en-US', { 
				hour12: false,
				hour: '2-digit',
				minute: '2-digit'
			});
			
			// Add blinking colon effect
			const colonVisible = Math.floor(Date.now() / 1000) % 2 === 0;
			const displayTime = timeString.replace(':', colonVisible ? ':' : ' ');
			
			if (this.timeStatusItem) {
				this.timeStatusItem.setLabel(displayTime);
			} else {
				this.timeStatusItem = this.ui.addStatusBarItem({
					label: displayTime,
					icon: 'clock',
					tooltip: 'Current time'
				});
			}
		};

		updateTime();
		this.timeInterval = setInterval(updateTime, 1000);
	}

	onUnload() {
		if (this.timeInterval) {
			clearInterval(this.timeInterval);
		}
	}
	
}
