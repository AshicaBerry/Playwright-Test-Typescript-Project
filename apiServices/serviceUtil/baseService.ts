import fetch, { Request, Response } from 'node-fetch';
import { URLSearchParams } from 'url';
import { RequestResponseHolder } from '../../webservicesExport';

export enum ReturnResponseAs {
	'JSON',
	'TEXT',
	'BUFFER',
}

export class BaseService {
	static async get(
		resourcePath: string,
		headersParam: any,
	): Promise<RequestResponseHolder> {
		let response: Response;
		let request: Request;
		try {
			response = await fetch(resourcePath, { headers: headersParam });
			request = new Request(resourcePath, {
				headers: headersParam,
			});
		} catch (error) {
			console.error(`get request failed\n${error.message}`);
			throw new Error(`get request failed\n${error.stack}`);
		}
		return { request, response };
	}
	static async delete(
		resourcePath: string,
		bodyParam: any,
		headersParam: any,
	): Promise<RequestResponseHolder> {
		let response: Response;
		let request: Request;
		try {
			if (bodyParam instanceof URLSearchParams) {
				response = await fetch(resourcePath, {
					method: 'DELETE',
					body: bodyParam,
					headers: headersParam,
				});
				request = new Request(resourcePath, {
					method: 'DELETE',
					body: bodyParam,
					headers: headersParam,
				});
			} else if (bodyParam === undefined) {
				response = await fetch(resourcePath, {
					method: 'DELETE',
					headers: headersParam,
				});
				request = new Request(resourcePath, {
					method: 'DELETE',
					headers: headersParam,
				});
			} else {
				response = await fetch(resourcePath, {
					method: 'DELETE',
					body: JSON.stringify(bodyParam),
					headers: headersParam,
				});
				request = new Request(resourcePath, {
					method: 'DELETE',
					body: JSON.stringify(bodyParam),
					headers: headersParam,
				});
			}
		} catch (error) {
			console.error(`delete request failed\n${error.message}`);
			throw new Error(`delete request failed\n${error.stack}`);
		}
		return { request, response };
	}

	static async post(
		resourcePath: string,
		bodyParam: any,
		headersParam: any,
	): Promise<RequestResponseHolder> {
		let response: Response;
		let request: Request;
		try {
			/* The Typescript instanceof is one of the operators, and it is used to determine the specific constructor, and it will be creating the object of the classes.
			 *  It will call the methods with the help of instance like that if we use an interface that can be implemented and extended through the classes.
			 * It will determine the property, and its chain will be added to the object it checks the actual condition of the prototype.
			 *  It returns the Boolean conditions also the name of the variables on its left-hand side included the function of the classes.
			 */
			if (bodyParam instanceof URLSearchParams) {
				response = await fetch(resourcePath, {
					method: 'POST',
					body: bodyParam,
					headers: headersParam,
				});
				request = new Request(resourcePath, {
					method: 'POST',
					body: bodyParam,
					headers: headersParam,
				});
			} else {
				response = await fetch(resourcePath, {
					method: 'POST',
					body: JSON.stringify(bodyParam),
					headers: headersParam,
				});
				request = new Request(resourcePath, {
					method: 'POST',
					body: JSON.stringify(bodyParam),
					headers: headersParam,
				});
			}
		} catch (error) {
			console.error(`post request failed\n${error.message}`);
			throw new Error(`post request failed\n${error.stack}`);
		}
		return { request, response };
	}
	static async convertResponseTo(
		response: Response | Request,
		returnResponseAs?: ReturnResponseAs,
	): Promise<any> {
		try {
			const responseClone = response.clone();
			const body = await responseClone.buffer();
			switch (returnResponseAs) {
				case ReturnResponseAs.JSON:
					return JSON.parse(body.toString());
				// break;
				case ReturnResponseAs.TEXT:
					return body.toString();
				// break;
				case ReturnResponseAs.BUFFER:
					return body;
				// break;
				default:
					return JSON.parse(body.toString());
				// break;
			}
		} catch (error) {
			console.error(
				`convert response to ${returnResponseAs} failed\n${error.message}`,
			);
			throw new Error(
				`convert response to ${returnResponseAs} failed\n${error.stack}`,
			);
		}
	}
}
