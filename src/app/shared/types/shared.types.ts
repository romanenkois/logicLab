export type ProgramingLanguage =
  | string
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'python';

export interface AppEnviromentConfig {
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
  codeEditor: {
    defaultLanguage: ProgramingLanguage;
    suportedLanguages: ProgramingLanguage[];
  };
}

export type SelectionOption = 'all' | 'popular' | 'new';
