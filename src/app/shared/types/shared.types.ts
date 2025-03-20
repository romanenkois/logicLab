export type ProgramingLanguage =
  | string
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript';

export interface AppEnviromentConfig {
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
}

export type SelectionOption = 'all' | 'popular' | 'new';
