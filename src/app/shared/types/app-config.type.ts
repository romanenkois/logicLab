import { ProgrammingLanguage } from '@types';
import { UserSettings } from './user-settings.type';

export interface AppConfig {
  api: {
    BASE_API_URL: string;
    BASE_CLIENT_URL: string;
  };
  codeEditor: {
    defaultLanguage: ProgrammingLanguage;
    supportedLanguages: ProgrammingLanguage[];
  };
  defaultUserSettings: UserSettings; // !? keep eye on circular dependency
}
