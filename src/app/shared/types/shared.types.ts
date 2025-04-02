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

export type CoursesSelectionOption = 'all' | 'popular' | 'new';

export interface ConsoleConfiguration {
  name: string;
  programingLanguage: ProgramingLanguage;

  code: string;
};
