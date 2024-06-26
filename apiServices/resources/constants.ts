const env: string = process.env.ENV;

export module Constants {
	export const projectPath: string = process.cwd();
	export const dataFolderPath: string = `${projectPath}/apiServices/resources/testdata/`;
}
