import { AppEnviromentConfig } from '@types';

export const config: AppEnviromentConfig = {
  app: {
    production: false,
    OFFLINE_MODE: false,
  },
  api: {
    // BASE_API_URL: 'https://logic-lab-api-ts-jspn.vercel.app/v2',
    BASE_API_URL: 'http://localhost:3000/v2',
    BASE_CLIENT_URL: 'http://localhost:4200/',
  },
};
