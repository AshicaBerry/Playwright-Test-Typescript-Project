const environment = process.env.ENV;

function getBaseUrl() {
	switch (environment) {
		case 'stage1':
			return '';
		case 'stage2':
			return '';
		default:
			return '';
	}
}
export module Urls {
	export const baseUrl: string = getBaseUrl();
	export const samplePageUrls = {
		samplePageOne: `${baseUrl}/`,
		samplePageTwo: `${baseUrl}/`,
	};
}
