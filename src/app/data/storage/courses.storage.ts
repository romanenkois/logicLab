import { Injectable, signal, WritableSignal } from '@angular/core';
import { Course, CourseSimple, Lesson } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesStorage {
  private readonly coursesList: WritableSignal<CourseSimple[]> = signal<CourseSimple[]>([]);

  private readonly courses: WritableSignal<Course[]> = signal<Course[]>([]);
  // those are lessons that are not assigned to any course
  private readonly lonelyLessons: WritableSignal<Lesson[]> = signal<Lesson[]>([]);

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
      return this.lonelyLessons().filter(
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
      this.lonelyLessons.set([...this.lonelyLessons(), lesson]);
      return;
    }

    if (!course.lessons) {
      course.lessons = [];
    }

    const existingLessonIndex = course.lessons.findIndex(
      (_lesson: Lesson) => _lesson.href === lesson.href
    );

    const updatedLessons = [...course.lessons];
    if (existingLessonIndex === -1) {
      // Add new lesson
      updatedLessons.push(lesson);
    } else {
      // Update existing lesson with new content
      updatedLessons[existingLessonIndex] = {
        ...course.lessons[existingLessonIndex],
        ...lesson
      };
    }

    // Update the courses signal with new reference
    const updatedCourses = this.courses().map(c =>
      c.href === course.href ? {...c, lessons: updatedLessons} : c
    );
    this.courses.set(updatedCourses);
  }
}
