import { Injectable } from "@angular/core";

export type CourseLesson = {
  id: string;
  href: string;
  courseHref: string;
  name: string;
  title: string;
  description: string;
  content: string;
}

export type Course = {
  id: string;
  href: string;
  name: string;
  title: string;
  description: string;
  programingLanguage: string;
  lessons: Array<CourseLesson>;
}

export type CoursesRepository = Array<Course>;

@Injectable({
  providedIn: "root"
})
export class CoursesStorage {
  private courses: CoursesRepository = [];

  public getCourse(courseHref: string): Course | undefined {
    return this.courses.find((course: Course) => course.href === courseHref);
  }

  public getLesson(courseHref: string, lessonHref: string): CourseLesson | undefined {
    const course = this.getCourse(courseHref);
    if (!course) {
      return;
    }

    return course.lessons.find((lesson: CourseLesson) => lesson.href === lessonHref);
  }
}
