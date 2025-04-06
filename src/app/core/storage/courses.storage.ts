import { Injectable, signal, WritableSignal } from '@angular/core';
import { Course, Lesson } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesStorage {
  private readonly courses: WritableSignal<Course[]> = signal<Course[]>([]);
  private readonly lessons: WritableSignal<Lesson[]> = signal<Lesson[]>([]);

  public getCourse(courseHref: string): Course {
    // used filter instead of find, so compiler would shut up about it being undefined
    return this.courses().filter(
      (course: Course) => course.href === courseHref
    )[0];
  }
  public addCourse(course: Course): void {
    this.courses.set([...this.courses(), course]);
  }

  public getLesson(lessonHref: string): Lesson {
    return this.lessons().filter(
      (lesson: Lesson) => lesson.href === lessonHref
    )[0];
  }
  public addLesson(lesson: Lesson): void {
    this.lessons.set([...this.lessons(), lesson]);
  }
}
