export type ProgrammingLanguage =
  | string
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'python';

export interface AppEnvironmentConfig {
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
  codeEditor: {
    defaultLanguage: ProgrammingLanguage;
    supportedLanguages: ProgrammingLanguage[];
  };
}

export type CoursesSelectionOption = 'all' | 'popular' | 'new';

export interface ConsoleConfiguration {
  name: string;
  programmingLanguage: ProgrammingLanguage;

  code: string;
};
