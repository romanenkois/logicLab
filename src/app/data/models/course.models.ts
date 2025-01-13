export type Lesson = {
  id: string;
  href: string;
  courseHref: string;
  name: string;
  title: string;
  description: string;
  content: Array<any>;
}

export type Course = {
  id: string;
  href: string;
  name: string;
  title: string;
  description: string;
  programingLanguage: string;
  lessons?: Array<Lesson>;
}
