import { Injectable, signal, WritableSignal } from "@angular/core";
import { Course, Lesson } from "@types";

@Injectable({
  providedIn: "root"
})
export class CoursesStorage {
  private readonly courses: WritableSignal<Array<Course>> = signal([]);
  public getCourse(courseHref: string): Course {
    // used filter insetead of find, so compiler would shut up about it being undefined
    return this.courses().filter((course: Course) => course.href === courseHref)[0];
  }
  public addCourse(course: Course): void {
    this.courses.set([...this.courses(), course]);
  }

  private lessons: WritableSignal<Array<Lesson>> = signal([]);
  public getLesson(courseHref: string, lessonHref: string): Lesson {
    return this.lessons().filter((lesson) => lesson.href == lessonHref && lesson.courseHref == courseHref )[0];
  }
  public addLesson(lesson: Lesson): void {
    this.lessons.set([...this.lessons(), lesson]);
  }
}
