import path from 'path';
import { LoginUtil } from '../../utils/loginUtil';
import { JsonReaderHelper } from '../../webservicesExport';
import { sample } from '../customTypes/project';
import { Constants } from '../resources/constants';
import { BillSyncRequest } from '../models/request/inputRequest';
const jsonFile = path.join(
	Constants.dataFolderPath,
	'/jsonRequests/projectInput.json',
);
export module projectDataClient {
	export async function billSyncHeaders(tenantName: string): Promise<any> {
		const tenantToken = LoginUtil.getTenantToken(tenantName);
		const billSyncHeaderDetail: any = {
			'content-type': 'application/json',
			'x-tenant-token': tenantToken,
		};
		return billSyncHeaderDetail;
	}

	export async function createSingleBillSyncRequestWithCustomFields(
		billSyncInputData: sample,
	): Promise<BillSyncRequest> {
		const request: BillSyncRequest = JsonReaderHelper.readAttribute(
			'$',
			jsonFile,
		) as BillSyncRequest;
		request.invoiceType = billSyncInputData.invoiceType;
		request.sourceSystem = billSyncInputData.sourceSystem;
		request.billType = billSyncInputData.billType;
		request.billDate = billSyncInputData.billDate;
		request.billGuId = billSyncInputData.billGuId;
		request.correlationId = billSyncInputData.correlationId;
		request.billId = billSyncInputData.billId;
		request.externalCustomerId = billSyncInputData.externalCustomerId;
		request.paymentSplits = billSyncInputData.paymentSplits;
		request.billAmount = billSyncInputData.billAmount;
		request.sourceTenantId = billSyncInputData.sourceTenantId;
		request.sourceBusinessUnitId = billSyncInputData.sourceBusinessUnitId;
		request.customerMobile = billSyncInputData.customerMobile;
		request.customerEmail = billSyncInputData.customerEmail;
		request.businessUnit = billSyncInputData.sourceBusinessUnitId;
		request.billNetAmount = billSyncInputData.billNetAmount;
		request.originalBillId = billSyncInputData.originalBillId;
		request.originalBillDate = billSyncInputData.originalBillDate;
		return request;
	}
}
