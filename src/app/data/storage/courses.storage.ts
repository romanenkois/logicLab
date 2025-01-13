import { Injectable, signal, WritableSignal } from "@angular/core";
import { Course, Lesson } from "@models";

@Injectable({
  providedIn: "root"
})
export class CoursesStorage {
  private readonly courses: WritableSignal<Array<Course>> = signal([]);
  public getCourse(courseHref: string): any {
    const course = this.courses().find((course: Course) => course.href === courseHref);
    return course || undefined;
  }
  public addCourse(course: Course): void {
    console.log('course to add',course)
    this.courses().push(course);
  }

  private lessons: WritableSignal<Array<Lesson>> = signal([]);
  public getLesson(courseHref: string, lessonHref: string): any {
    const lesson = this.lessons().filter((lesson) => lesson.href == lessonHref);
    console.log('lesson',lesson)
    return  lesson || undefined;
  }
  public addLesson(courseHref: string, lesson: Lesson): void {
    console.log('lesson to add',lesson)
    this.lessons.set([...this.lessons(), lesson]);
    console.log('lessons',this.lessons())
  }
}
