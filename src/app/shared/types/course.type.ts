import { LessonContent, ProgramingLanguage } from '@types';

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

export interface CourseDTO {
  id: string;
  href: string;
  name: string;
  title: string;
  programingLanguage: ProgramingLanguage;
  description: string;
}

export interface Lesson {
  id: string;
  href: string;
  courseHref: string;
  category?: string;
  // name is only present if category is present
  categoryName?: string & (undefined extends Lesson['category'] ? never : unknown);
  position: number;
  name: string;
  title: string;
  description: string;
  content: Array<LessonContent>;
}

export type LessonSimple = Omit<Lesson, 'content'>;

