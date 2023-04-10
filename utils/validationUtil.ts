import { expect } from '@playwright/test';
import { RequestResponseHolder } from '../webservicesExport';

export module ValidationUtil {
	export async function responseCode(
		requestResponse: RequestResponseHolder,
		expectedStatusCode: number,
		errorMessage?: string,
	) {
		try {
			const expStatusCode =
				expectedStatusCode === undefined ? 200 : expectedStatusCode;
			expect(
				expStatusCode,
				`response code did not match expected-${expStatusCode}, actual-${requestResponse.response.status}`,
			).toEqual(requestResponse.response.status);
		} catch (error) {
			if (errorMessage) console.log(`${errorMessage}`);
			console.error('could not validate response code');
			throw new Error(`could not validate response code\n${error.stack}`);
		}
	}
}
