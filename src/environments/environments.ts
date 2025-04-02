import { AppEnviromentConfig } from '@types';

const production = false;

export const config: AppEnviromentConfig = {
  api: {
    BASE_API_URL: production ? 'https://logic-lab-api-ts.vercel.app/v2': 'http://localhost:3000/v2',
    BASE_CLIENT_URL: production ? 'https://logic-lab-two.vercel.app/' : 'http://localhost:4200/',
  },
  codeEditor: {
    defaultLanguage: 'javascript',
    suportedLanguages: [
      'html',
      'javascript',
      'typescript',
      'python',
    ],
  },
};
