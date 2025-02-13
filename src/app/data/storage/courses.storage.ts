import { Injectable, signal, WritableSignal } from '@angular/core';
import { Course, Lesson } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesStorage {
  private readonly courses: WritableSignal<Array<Course>> = signal([]);
  private readonly lessons: WritableSignal<Array<Lesson>> = signal([]); // the storage for lessons with no rendered course

  public getCourse(courseHref: string): Course {
    // used filter insetead of find, so compiler would shut up about it being undefined
    return this.courses().filter(
      (course: Course) => course.href === courseHref
    )[0];
  }
  public addCourse(course: Course): void {
    this.courses.set([...this.courses(), course]);
  }

  public getLesson(courseHref: string, lessonHref: string): Lesson | null {
    const course = this.getCourse(courseHref);
    if (!course) {
      return this.lessons().filter(
        (lesson: Lesson) =>
          lesson.href == lessonHref && lesson.courseHref == courseHref
      )[0];
    }
    return course.lessons.filter(
      (lesson: Lesson) => lesson.href === lessonHref
    )[0];
  }
  public addLesson(lesson: Lesson): void {
    const course = this.getCourse(lesson.courseHref);
    if (!course) {
      this.lessons.set([...this.lessons(), lesson]);
      return;
    }

    if (!course.lessons) {
      course.lessons = [];
    }

    const lessonInCourse = course.lessons.filter(
      (_lesson: Lesson) => _lesson.href === lesson.href
    )[0];

    if (!lessonInCourse) {
      // Create new arrays to trigger change detection
      const updatedLessons = [...course.lessons, lesson];
      const updatedCourses = this.courses().map(c =>
        c.href === course.href ? {...c, lessons: updatedLessons} : c
      );
      this.courses.set(updatedCourses);
    }
  }
}
