import { Injectable, signal, WritableSignal } from '@angular/core';
import { Course, Lesson, LessonSimple } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesStorage {
  private readonly courses: WritableSignal<Course[]> = signal<Course[]>([]);
  private readonly lessons: WritableSignal<Lesson[]> = signal<Lesson[]>([]);

  public getCourse(courseHref: string): Course {
    // used filter instead of find, so compiler would shut up about it being undefined
    return this.courses().filter(
      (course: Course) => course.href === courseHref,
    )[0];
  }
  public getCourses(): Course[] {
    return this.courses();
  }
  public addCourse(course: Course): void {
    const couseInCourses = this.courses().find((c) => c.href === course.href);
    if (!couseInCourses) {
      this.courses.set([...this.courses(), course]);
    }
  }
  public addCourses(courses: Course[]): void {
    const newCourses = courses.filter(
      (course) => !this.courses().some((existing) => existing.href === course.href),
    );
    this.courses.set([...this.courses(), ...newCourses]);
  }

  public getLesson(lessonHref: string): Lesson {
    return this.lessons().filter(
      (lesson: Lesson) => lesson.href === lessonHref,
    )[0];
  }
  public addLesson(lesson: Lesson): void {
    // this way we dont skip the suplicates, but rather overwrite them
    const existingLessonIndex = this.lessons().findIndex(
      (l) => l.href === lesson.href,
    );

    if (existingLessonIndex !== -1) {
      const updatedLessons = [...this.lessons()];
      updatedLessons[existingLessonIndex] = lesson;
      this.lessons.set(updatedLessons);
    } else {
      this.lessons.set([...this.lessons(), lesson]);
    }
  }
  public addLessons(lessons: Lesson[] | LessonSimple[]): void {
    if (!('content' in lessons[0])) {
      lessons = lessons.map((lesson: LessonSimple) => ({
        ...lesson,
        content: [],
      })) as Lesson[];
    }
    this.lessons.set([...this.lessons(), ...(lessons as Lesson[])]);
  }
}
