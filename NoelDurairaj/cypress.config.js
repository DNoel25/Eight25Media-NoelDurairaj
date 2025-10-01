const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://www.eight25media.com',
		setupNodeEvents(on, config) {
			return config;
		},
		video: false,
		retries: 1,
	},
});


