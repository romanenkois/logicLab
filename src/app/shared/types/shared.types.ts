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
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Message = {
  title: string;
  text: string;
  secondaryText?: string;
  buttonText: string;
}
