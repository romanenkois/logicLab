import { AppConfig } from '@types';

export const appConfig: AppConfig = {
  api: {
    BASE_API_URL: 'https://logic-lab-api-ts.vercel.app/v2',
    BASE_CLIENT_URL: 'https://logic-lab-two.vercel.app/',
  },
  codeEditor: {
    defaultLanguage: 'javascript',
    supportedLanguages: ['javascript'],
  },
  defaultUserConfig: {
    keepLogedIn: false,
  },
};
