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
  public addCourse(course: Course): void {
    this.courses.set([...this.courses(), course]);
  }
  public addCourses(courses: Course[]): void {
    this.courses.set([...this.courses(), ...courses]);
  }

  public getLesson(lessonHref: string): Lesson {
    return this.lessons().filter(
      (lesson: Lesson) => lesson.href === lessonHref,
    )[0];
  }
  public addLesson(lesson: Lesson): void {
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
