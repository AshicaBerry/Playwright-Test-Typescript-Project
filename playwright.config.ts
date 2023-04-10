import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	globalSetup: './setup/setup.ts',
	// globalTeardown: './setup/teardown.ts',
	timeout: 5 * 60 * 1000,
	expect: {
		timeout: 90 * 1000,
	},
	retries: 0,
	testMatch: [
		// '**/tests/*.test.ts',
		'**/tests/loginPage.test.ts',
		// '**/tests/api/**/**/*.test.ts',
	],
	use: {
		trace: 'on-first-retry',
		viewport: {
			width: 1280,
			height: 720,
		},
		ignoreHTTPSErrors: true,
		video: 'on',
		screenshot: 'on',
		headless: false,
		actionTimeout: 90000,
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },
	],
	reporter: [
		['html', { outputFolder: 'test-report', open: 'never' }],
		['allure-playwright'],
		['./customReporter.ts'],
		[
			'json',
			{
				outputFile: './results.json',
			},
		],
	],
};

export default config;
