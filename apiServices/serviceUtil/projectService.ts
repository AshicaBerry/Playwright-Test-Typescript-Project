import { LoginUtil } from '../../utils/loginUtil';
import { webPay } from '../customTypes/project';
import { RequestResponseHolder } from '../customTypes/requestResponseCustomType';
import { projectDataClient } from '../dataClient/projectDataClient';
import { Urls } from '../resources/urls';
import { BaseService } from './baseService';

export class ProjectService extends BaseService {
	static async createWebPay(
		input: webPay,
		tenantName: string,
	): Promise<RequestResponseHolder> {
		try {
			const headers = await projectDataClient.billSyncHeaders(tenantName);
			const request =
				await projectDataClient.createSingleBillSyncRequestWithCustomFields(
					input,
				);
			// writeFileSync('/Users/arunsarode/Desktop/Casa_GIT/test_automation/tokens/billsync.json', JSON.stringify(request));
			return await BaseService.post(
				Urls.samplePageUrls.samplePageOne,
				request,
				headers,
			);
		} catch (error) {
			console.error(`create bill sync data failed\n${error.stack}`);
			throw new Error(`create bill sync data failed\n${error.stack}`);
		}
	}
}
