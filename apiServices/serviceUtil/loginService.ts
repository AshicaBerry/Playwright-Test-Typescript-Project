import { LoginUtil } from '../../utils/loginUtil';
import { Urls, ValidationUtil } from '../../webservicesExport';
import { BaseService } from './baseService';

export class LoginService extends BaseService {
	static async login(tenantName: string) {
		const loginDetailsRequest = await LoginUtil.getLoginCredentials(
			tenantName,
		);
		const header = await LoginUtil.loginHeaders();
		const request = {
			email: loginDetailsRequest.userEmail,
			password: loginDetailsRequest.userPassword,
		};
		const loginReqRes = await BaseService.post(
			Urls.baseUrl,
			request,
			header,
		);
		await ValidationUtil.responseCode(loginReqRes, 200);
	}
}
