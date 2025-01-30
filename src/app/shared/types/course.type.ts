import { ProgramingLanguage } from '@types';

export type CoursesList = {
  id: string;
  href: string;
  name: string;
  programingLanguage: ProgramingLanguage;
}[]

export interface Course {
  id: string;
  href: string;
  name: string; // short name, like to be used in cramped lists
  title: string; // long name, used in full page
  programingLanguage: ProgramingLanguage;
  description: string;
  lessons: Array<Lesson>;
}

export interface Lesson {
  id: string;
  href: string;
  courseHref: string;
  name: string;
  title: string;
  description: string;
  content?: Array<LessonContent>;
}

export type LessonContent =
  | PlainTextBlock
  | ListBlock
  | CodeSampleBlock;

interface LessonBlock {
  type: string;
  object: object;
}

export interface PlainTextBlock extends LessonBlock {
  type: 'plain-text';
  object: {
    title?: string;
    text: string;
  }
}

export interface ListBlock extends LessonBlock {
  type: 'list';
  object: {
    title?: string;
    items: Array<string>;
  }
}

export interface CodeSampleBlock extends LessonBlock {
  type: 'code-sample';
  object: {
    title?: string;
    programmingLanguage?: ProgramingLanguage;
    code: string;
    codeOutput?: string;
  }
}
