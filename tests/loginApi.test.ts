import { test } from '@playwright/test';
import { JsonReaderHelper, ValidationUtil } from '../webservicesExport';
import { ProjectService } from '../apiServices/serviceUtil/projectService';
import path from 'path';
import { Constants } from '../apiServices/resources/constants';
const billInputJsonFile = path.join(
	Constants.dataFolderPath,
	'/jsonRequests/projectInput.json',
);
const billInput = JsonReaderHelper.readAttribute('$', billInputJsonFile);
test.describe('', async () => {
	test('Make a post request', async () => {
		// billSyncPayloadMandatoryFields.billId =
		// 	await RandomGenerator.generateAlphaNumeric(10);
		const requestResponse = await ProjectService.createWebPay(
			billInput,
			'',
		);

		await ValidationUtil.responseCode(
			requestResponse,
			200,
			'response is not as expected',
		);
	});
});
