import { expect, Page, Locator } from '@playwright/test';

export class BasePageHelper {
	readonly page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	async wait(milliSeconds: number) {
		await this.page.waitForTimeout(milliSeconds);
	}

	async pageRefresh() {
		await this.page.reload({ waitUntil: 'networkidle' });
	}

	async checkElementToBeVisible(element: string) {
		const locator = this.page.locator(element);
		await expect(locator).toBeVisible();
		return locator;
	}

	async checkPageToHaveUrl(url: string) {
		await expect(this.page).toHaveURL(url);
	}

	async sendText(element: string, text: string) {
		const locator = await this.checkElementToBeVisible(element);
		await locator.type(text);
	}

	async clickOnElement(element: string) {
		const locator = await this.checkElementToBeVisible(element);
		await locator.click();
	}

	async openURL(url: string) {
		// await this.page.goto(url, { waitUntil: 'networkidle' });
		await this.page.goto(url, { waitUntil: 'domcontentloaded' });

		// await this.page.waitForNavigation({
		// 	timeout: 90000,
		// 	waitUntil: 'domcontentloaded',
		// });
	}

	async scrollElement(element: string) {
		this.page.locator(element);
		await this.page.$eval(element, elem => {
			elem.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'end',
			});
		});
	}

	async checkiFrameToBeVisible(
		frameName: string,
		frameElement: string,
	): Promise<Locator> {
		const locator = this.page.frameLocator(frameName).locator(frameElement);
		await expect(locator).toBeVisible();
		return locator;
	}

	async getTextFromiFrameElement(
		frameName: string,
		frameElement: string,
	): Promise<string> {
		const locator = await this.checkiFrameToBeVisible(
			frameName,
			frameElement,
		);
		// await this.wait(6000);
		const textValue = await locator.innerText();
		return textValue;
	}
}
