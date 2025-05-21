import { AppConfig } from '@types';

export const $appConfig: AppConfig = {
  api: {
    // BASE_API_URL: 'https://logic-lab-api-ts.vercel.app/v2',
    // BASE_CLIENT_URL:'https://logic-lab-two.vercel.app/',

    BASE_API_URL:'http://localhost:3000/v2',
    BASE_CLIENT_URL: 'http://localhost:4200/',
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
