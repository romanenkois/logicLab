import { ProgramingLanguage, LessonSimple } from '@types';

export interface Course {
  id: string;
  href: string;
  name: string; // short name, like to be used in cramped lists
  title: string; // long name, used in full page
  description: string;
  programingLanguage: ProgramingLanguage;
  lessons: LessonSimple[];
}

// export type CourseSimple = Omit<Course, 'lessons'>
