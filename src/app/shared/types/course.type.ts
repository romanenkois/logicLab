import { ProgrammingLanguage, LessonSimple } from '@types';

export interface Course {
  href: string;
  name: string; // short name, like to be used in cramped lists
  title: string; // long name, used in full page
  description: string;
  programmingLanguage: ProgrammingLanguage;
  lessons: LessonSimple[];
}

// export type CourseSimple = Omit<Course, 'lessons'>
