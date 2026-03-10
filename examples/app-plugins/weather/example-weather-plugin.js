/**
* (See the plugin-sdk's README.md for more details on how to install and test these examples.)
* 
* Example plugin to show a simple status bar item with weather data for Amsterdam.
* 
* Try it out by installing the plugin (see README.md).
* 
* It demonstrates:
* - Using the ui.addToaster() method to show a toast
* - Using the ui.addStatusBarItem() method to add a status bar item
*/

class Plugin extends AppPlugin {
	
	onLoad() {
		this.statusBarItem = this.ui.addStatusBarItem({
			label: "Loading weather...",
			icon: "weather",
			tooltip: "Amsterdam Weather",
			onClick: async () => {
				await this.refreshWeather();
				const t = this.ui.addToaster({
					title: "Weather refreshed",
					dismissible: true,
					autoDestroyTime: 1000,
				});
				t.bounce();
			}
		});
		
		// Initial weather fetch
		this.refreshWeather();
		
		// Refresh weather every 30 minutes
		this.interval = setInterval(() => this.refreshWeather(), 30 * 60 * 1000);
	}

	onUnload() {
		if (this.statusBarItem) {
			this.statusBarItem.remove();
		}
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	
	async refreshWeather() {
		try {
			// Using a free weather API (OpenWeatherMap alternative)
			const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.3676&longitude=4.9041&current=temperature_2m,weather_code&timezone=Europe/Amsterdam');
			const data = await response.json();

			if (!this.statusBarItem) return;
			
			if (data.current) {
				const temp = Math.round(data.current.temperature_2m);
				const weatherCode = data.current.weather_code;
				const emoji = this.getWeatherEmoji(weatherCode);
				
				this.statusBarItem.setLabel(`${emoji} ${temp}°C`);
				this.statusBarItem.setTooltip(`Amsterdam: ${temp}°C - ${this.getWeatherDescription(weatherCode)}`);
			}
		} catch (error) {
			if (!this.statusBarItem) return;
			console.error('Failed to fetch weather:', error);
			this.statusBarItem.setLabel('🌤️ --°C');
			this.statusBarItem.setTooltip('Weather unavailable');
		}
	}
	
	/**
	 * @param {number} code
	 */
	getWeatherEmoji(code) {
		// WMO Weather interpretation codes
		/** @type {Record<number, string>} */
		const emojiMap = {
			0: '☀️',   // Clear sky
			1: '🌤️',   // Mainly clear
			2: '⛅',    // Partly cloudy
			3: '☁️',    // Overcast
			45: '🌫️',  // Foggy
			48: '🌫️',  // Depositing rime fog
			51: '🌦️',  // Light drizzle
			53: '🌦️',  // Moderate drizzle
			55: '🌧️',  // Dense drizzle
			61: '🌧️',  // Slight rain
			63: '🌧️',  // Moderate rain
			65: '🌧️',  // Heavy rain
			71: '🌨️',  // Slight snow
			73: '🌨️',  // Moderate snow
			75: '🌨️',  // Heavy snow
			77: '🌨️',  // Snow grains
			80: '🌦️',  // Slight rain showers
			81: '🌧️',  // Moderate rain showers
			82: '🌧️',  // Violent rain showers
			85: '🌨️',  // Slight snow showers
			86: '🌨️',  // Heavy snow showers
			95: '⛈️',   // Thunderstorm
			96: '⛈️',   // Thunderstorm with slight hail
			99: '⛈️'    // Thunderstorm with heavy hail
		};
		return emojiMap[code] || '🌤️';
	}
	
	/**
	 * @param {number} code
	 */
	getWeatherDescription(code) {
		/** @type {Record<number, string>} */
		const descriptionMap = {
			0: 'Clear sky',
			1: 'Mainly clear',
			2: 'Partly cloudy',
			3: 'Overcast',
			45: 'Foggy',
			48: 'Depositing rime fog',
			51: 'Light drizzle',
			53: 'Moderate drizzle',
			55: 'Dense drizzle',
			61: 'Slight rain',
			63: 'Moderate rain',
			65: 'Heavy rain',
			71: 'Slight snow',
			73: 'Moderate snow',
			75: 'Heavy snow',
			77: 'Snow grains',
			80: 'Slight rain showers',
			81: 'Moderate rain showers',
			82: 'Violent rain showers',
			85: 'Slight snow showers',
			86: 'Heavy snow showers',
			95: 'Thunderstorm',
			96: 'Thunderstorm with slight hail',
			99: 'Thunderstorm with heavy hail'
		};
		return descriptionMap[code] || 'Unknown';
	}
}
