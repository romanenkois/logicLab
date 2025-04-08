export type ProgrammingLanguage =
  | string
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'python';



export type CoursesSelectionOption = 'all' | 'popular' | 'new';

export interface ConsoleConfiguration {
  name: string;
  programmingLanguage: ProgrammingLanguage;

  code: string;
};
