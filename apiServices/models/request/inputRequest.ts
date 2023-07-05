interface PaymentSplits {
	mode: string;
	value: number;
}
export interface BillSyncRequest {
	invoiceType: string;
	sourceSystem?: string;
	billType: string;
	channel: string;
	billDate: string;
	billLevelOfferDiscount: number;
	billGuId: string;
	correlationId: string;
	billId: string;
	paymentSplits: PaymentSplits[];
	billAmount: number;
	billNetAmount: number;
	storeName: string;
	sourceTenantId: string;
	sourceBusinessUnitId: string;
	customerMobile: string;
	customerEmail: string;
	businessUnit: string;
	externalCustomerId: string;
	offerCode?: string;
	totalDiscountAmount?: number;
	originalBillId?: string;
	originalBillDate?: string;
}
