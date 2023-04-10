import { Request, Response } from 'node-fetch';

export interface RequestResponseHolder {
	request?: Request;
	response?: Response;
	customDescription?: any;
}
