import { AppEnviromentConfig } from '@types';

export const config: AppEnviromentConfig = {
  app: {
    production: true,
    OFFLINE_MODE: false,
  },
  api: {
    BASE_API_URL: 'https://logic-lab-api-ts.vercel.app/v2',
    BASE_CLIENT_URL: 'https://logic-lab-two.vercel.app/',
  },
};
