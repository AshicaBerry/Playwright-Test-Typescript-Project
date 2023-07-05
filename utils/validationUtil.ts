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

	export async function verifyValues(
		requestResponse: RequestResponseHolder,
		expected: string,
		actual: string,
		customErrorMsg?: string,
	): Promise<any>;

	export async function verifyValues(
		requestResponse: RequestResponseHolder,
		expected: number,
		actual: number,
		customErrorMsg?: string,
	): Promise<any>;

	export async function verifyValues(
		requestResponse: RequestResponseHolder,
		expected: boolean,
		actual: boolean,
		customErrorMsg?: string,
	): Promise<any>;
	export async function verifyValues(
		requestResponse: RequestResponseHolder,
		expected: [],
		actual: [],
		customErrorMsg?: string,
	): Promise<any>;
	export async function verifyValues(
		requestResponse: RequestResponseHolder,
		expected: any,
		actual: any,
		customErrorMsg?: string,
	): Promise<any> {
		try {
			let matched: boolean = false;
			switch (typeof expected) {
				case 'string':
					if (expected === actual) matched = true;
					break;
				case 'boolean':
					if (expected === actual) matched = true;
					break;
				case 'number':
					if (expected === actual) matched = true;
					break;
				default:
					if (expected === actual) matched = true;
					break;
			}
			if (!matched)
				throw new Error(
					`${customErrorMsg}\n values not matching expected-${expected}, actual-${actual}`,
				);
		} catch (error) {
			console.error(
				`${customErrorMsg}\n values not matching expected-${expected}, actual-${actual}`,
			);
			throw new Error(
				`${customErrorMsg}\n values not matching expected-${expected}, actual-${actual}`,
			);
		}
	}
}
