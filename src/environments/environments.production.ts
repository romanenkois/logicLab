import { AppEnvironmentConfig } from '@types';

export const config: AppEnvironmentConfig = {
  api: {
    BASE_API_URL: 'https://logic-lab-api-ts.vercel.app/v2',
    BASE_CLIENT_URL: 'https://logic-lab-two.vercel.app/',
  },
  codeEditor: {
    defaultLanguage: 'javascript',
    supportedLanguages: ['javascript'],
  },
};
