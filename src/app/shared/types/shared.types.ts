export type ProgramingLanguage =
  | string
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript';

export interface AppEnviromentConfig {
  app: {
    production: boolean;
    OFFLINE_MODE: boolean;
  };
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
}
