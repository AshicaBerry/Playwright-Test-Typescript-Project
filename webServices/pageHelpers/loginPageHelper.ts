import { Page } from '@playwright/test';
import { BasePageHelper } from './BasePageHelper';

export class LoginPageHelper {
	readonly page: Page;

	readonly emailfield: string;

	readonly passwordfield: string;

	readonly signinBtn: string;

	readonly loginBtn: string;

	readonly BasePageHelper: BasePageHelper;

	constructor(page: Page) {
		this.page = page;
		this.emailfield = '#username';
		this.passwordfield = '#password';
		this.signinBtn = '#kc-login';
		this.loginBtn = '#continueBtn';
		this.BasePageHelper = new BasePageHelper(page);
	}

	async clickOnSignInBtn() {
		await Promise.all([
			this.page.waitForNavigation({
				timeout: 90000,
				waitUntil: 'networkidle',
			}),
			await this.page.getByRole('button', { name: 'Sign In' }).click(),
		]);
		// await this.page.waitForTimeout(10000)
		//    await this.BasePageHelper.clickOnElement(this.signinBtn);
	}

	async clickOnLogInBtn() {
		await Promise.all([
			this.page.waitForNavigation({
				timeout: 90000,
				waitUntil: 'networkidle',
			}),
			this.BasePageHelper.clickOnElement(this.loginBtn),
		]);
		// await this.page.waitForTimeout(10000)
		//    await this.BasePageHelper.clickOnElement(this.signinBtn);
	}

	async doLogin(url: string, useremail: string, userpassword: string) {
		await this.BasePageHelper.openURL(url);
		await this.BasePageHelper.sendText(this.emailfield, useremail);
		await this.BasePageHelper.sendText(this.passwordfield, userpassword);
		await this.clickOnLogInBtn();
	}
}
