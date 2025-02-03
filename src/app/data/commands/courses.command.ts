import { inject, Injectable } from '@angular/core';
import { GeneralApiService } from '@api';
import { CoursesStorage } from '@storage';
import { Course } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesCommand {
  private appAPI: GeneralApiService = inject(GeneralApiService);
  private coursesStorage: CoursesStorage = inject(CoursesStorage);

  // public load

  public loadCourse(courseHref: string) {
    const courses = this.coursesStorage.getCourse(courseHref);

    if (!courses) {
      this.appAPI.getCourse(courseHref, true).subscribe(
        (responce) => {
          if (
            responce.lessons &&
            responce.lessons.length > 0 &&
            responce.course
          ) {
            const course: Course = responce.course;
            course.lessons = responce.lessons;
            this.coursesStorage.addCourse(course);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  public loadLesson(courseHref: string, lessonHref: string) {
    const lesson = this.coursesStorage.getLesson(courseHref, lessonHref);

    if (!lesson || !lesson.content || lesson.content.length < 1) {
      this.appAPI.getLesson(courseHref, lessonHref).subscribe(
        (responce) => {
          if (responce.lesson) {
            this.coursesStorage.addLesson(responce.lesson);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
