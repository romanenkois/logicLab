import { AppEnviromentConfig } from '@types';


export const config: AppEnviromentConfig = {
  app: {
    production: false,
    OFFLINE_MODE: false,
  },
  api: {
    BASE_API_URL: 'https://logic-lab-api-ts.vercel.app/v2',
    BASE_CLIENT_URL: 'https://logic-lab-two.vercel.app/',
    // BASE_API_URL: this.appConfig.production ? 'http://localhost:3000/v2' : '#',
    // BASE_CLIENT_URL: 'http://localhost:4200/',
  },
};
