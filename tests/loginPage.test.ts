import { test } from '@playwright/test';
import { BasePageHelper, LoginPageHelper } from '../webservicesExport';
let LoginPage: LoginPageHelper;
let BasePage: BasePageHelper;

test.describe('', async () => {
	test.beforeEach(async ({ page }) => {
		LoginPage = new LoginPageHelper(page);
		BasePage = new BasePageHelper(page);
	});
	test.afterEach(async () => {
		console.log('after each called');
	});
	test('', async () => {});
});
