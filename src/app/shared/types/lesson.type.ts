import { LessonContent } from '@types';

export interface Lesson {
  id: string;
  href: string;
  name: string;
  title: string;
  description: string;
  content: Array<LessonContent>;
}

export interface LessonSimple {
  id: Lesson['id'];
  href: Lesson['href'];
  name: Lesson['name'];
  title: Lesson['title'];
  description: Lesson['description'];
}
