import { Constants } from '../apiServices/resources/constants';
import { JsonReaderHelper, UserCredentials } from '../webservicesExport';

const env: string = process.env.ENV;

const basicConfigFilePath: string = `${Constants.projectPath}/apiServices/resources/basicConfig.json`;
export module LoginUtil {
	export async function getLoginCredentials(
		tenantName: string,
	): Promise<UserCredentials> {
		const userEmail = JsonReaderHelper.readAttribute(
			`$.${env}.credentials.${tenantName}.email`,
			basicConfigFilePath,
		);
		const userPassword = JsonReaderHelper.readAttribute(
			`$.${env}.credentials.${tenantName}.password`,
			basicConfigFilePath,
		);
		const loginCredentials: UserCredentials = {
			userEmail: userEmail,
			userPassword: userPassword,
		};
		return loginCredentials;
	}

	export async function loginHeaders(): Promise<any> {
		const loginHdr: any = [['content-type', 'application/json']];
		return loginHdr;
	}
}
