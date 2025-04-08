import { ProgrammingLanguage } from '@types';

export interface AppConfig {
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
  codeEditor: {
    defaultLanguage: ProgrammingLanguage;
    supportedLanguages: ProgrammingLanguage[];
  };
  defaultUserConfig: UserConfig; // !? keep eye on circular dependency
}

export interface UserConfig {
  keepLogedIn: boolean;
}
