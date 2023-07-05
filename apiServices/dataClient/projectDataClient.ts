import path from 'path';
import { LoginUtil } from '../../utils/loginUtil';
import { JsonReaderHelper } from '../../webservicesExport';
import { webPay } from '../customTypes/project';
import { Constants } from '../resources/constants';
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
		billSyncInputData: webPay,
	): Promise<webPay> {
		const request = JsonReaderHelper.readAttribute('$', jsonFile) as webPay;
		request.invoiceType = billSyncInputData.invoiceType;
		request.sourceSystem = billSyncInputData.sourceSystem;
		request.billType = billSyncInputData.billType;
		request.channel = billSyncInputData.channel;
		request.billDate = billSyncInputData.billDate;
		request.billLevelOfferDiscount =
			billSyncInputData.billLevelOfferDiscount;
		request.billGuId = billSyncInputData.billGuId;
		request.correlationId = billSyncInputData.correlationId;
		request.billId = billSyncInputData.billId;
		request.externalCustomerId = billSyncInputData.externalCustomerId;
		request.paymentSplits = billSyncInputData.paymentSplits;
		request.billAmount = billSyncInputData.billAmount;
		request.storeName = billSyncInputData.storeName;
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
