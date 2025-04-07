import { LessonContent } from '@types';

export interface Lesson {
  href: string;
  name: string;
  title: string;
  description: string;
  content: Array<LessonContent>;
}

export interface LessonSimple {
  href: Lesson['href'];
  name: Lesson['name'];
  title: Lesson['title'];
  description: Lesson['description'];
}
