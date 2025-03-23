/**
 *
 * This file serves to import all the env's into variables for better handle of the env's
 * This way we have a clear view of what is in the env's
 *
 */
type ProcessEnv = {
	MODE: 'development' | 'test' | 'production';
};
const env: ProcessEnv = import.meta.env as unknown as ProcessEnv;

export const isProduction: boolean = env.MODE === 'production';
export const isDevelopment: boolean = env.MODE === 'development';
export const isTest: boolean = env.MODE === 'test';
export const envBaseUrlDataGov = import.meta.env.VITE_API_BASE_URL_DATA_GOV;
export const envBaseUrlDataCountry = import.meta.env.VITE_API_BASE_URL_DATA_COUNTRY;
export const versionApp = !isProduction ? `v0.9.6-${env.MODE}` : ''

