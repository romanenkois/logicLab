import { AppConfig } from '@types';

const production = false;

export const $appConfig: AppConfig = {
  api: {
    BASE_API_URL: production ? 'https://logic-lab-api-ts.vercel.app/v2': 'http://localhost:3000/v2',
    BASE_CLIENT_URL: production ? 'https://logic-lab-two.vercel.app/' : 'http://localhost:4200/',
  },
  codeEditor: {
    defaultLanguage: 'javascript',
    supportedLanguages: [
      // 'html',
      'javascript',
      // 'typescript',
      // 'python',
    ],
  },
  defaultUserSettings: {
    theme: 'dark',
    keepToken: true,
  },
};
