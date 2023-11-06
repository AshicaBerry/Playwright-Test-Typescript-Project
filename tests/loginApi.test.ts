import { test } from '@playwright/test';
import { JsonReaderHelper, ValidationUtil } from '../webservicesExport';
import { ProjectService } from '../apiServices/serviceUtil/projectService';
import { inputResponse } from '../apiServices/models/response/inputResponse';
import path from 'path';
import { Constants } from '../apiServices/resources/constants';
import {
	BaseService,
	ReturnResponseAs,
} from '../apiServices/serviceUtil/baseService';
const billInputJsonFile = path.join(
	Constants.dataFolderPath,
	'/jsonRequests/projectInput.json',
);
const billInput = JsonReaderHelper.readAttribute('$', billInputJsonFile);
test.describe('', async () => {
	test('Make a post request', async () => {
		// billSyncPayloadMandatoryFields.billId =
		// 	await RandomGenerator.generateAlphaNumeric(10);
		const requestResponse = await ProjectService.createSamplePay(
			billInput,
			'',
		);
		const response = (await BaseService.convertResponseTo(
			requestResponse.response,
			ReturnResponseAs.JSON,
		)) as inputResponse;

		await ValidationUtil.responseCode(
			requestResponse,
			200,
			'response is not as expected',
		);
		await ValidationUtil.verifyValues(
			requestResponse,
			'Successfully posted to kafka topic groupone_requests_01',
			response.toString(),
			``,
		);
	});
});
