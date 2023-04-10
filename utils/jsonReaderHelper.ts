import { JSONPath } from 'jsonpath-plus';
import { readFileSync } from 'fs';

export module JsonReaderHelper {
	export function readAttribute(
		jsonPathExpression: string,
		jsonFilePath: string,
	): any;
	export function readAttribute(
		jsonPathExpression: string,
		jsonObject: {},
	): any;
	export function readAttribute(
		jsonPathExpression: string,
		jsonFilePathOrObject: any,
	): any {
		let value: any;
		try {
			if (jsonFilePathOrObject instanceof Object) {
				value = JSONPath({
					path: jsonPathExpression,
					json: jsonFilePathOrObject,
				});
			} else {
				value = JSONPath({
					path: jsonPathExpression,
					json: JSON.parse(
						readFileSync(jsonFilePathOrObject, 'utf-8'),
					),
				});
			}
		} catch (error) {
			console.log(error.stack);
			throw new Error(error);
		}
		if (value.length === 1) return value[0];
		return value;
	}
}
