import { inject, Injectable } from '@angular/core';
import { CoursesAPI } from '@api';
import { CoursesStorage } from '@storage';
import { Course, CoursesSelectionOption, LoadingState } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseCommand {
  private appAPI: CoursesAPI = inject(CoursesAPI);
  private coursesStorage: CoursesStorage = inject(CoursesStorage);

  public loadCourse(courseHref: string): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');
      const courses = this.coursesStorage.getCourse(courseHref);
      if (courses) {
        observer.next('resolved');
        observer.complete();
      }

      this.appAPI.getCourse(courseHref, true).subscribe({
        next: (response) => {
          this.coursesStorage.addCourse(response.course as Course);
          observer.next('resolved');
          observer.complete();
        },
        error: (error) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public loadCourses(
    selection: CoursesSelectionOption,
  ): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      this.appAPI.getCourses(selection).subscribe({
        next: (response) => {
          response = response.courses as Course[];
          this.coursesStorage.addCourses(response);
          observer.next('resolved');
          observer.complete();
        },
        error: (error) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public loadLesson(lessonHref: string): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');
      const lesson = this.coursesStorage.getLesson(lessonHref);

      if (!lesson || !lesson.content || lesson.content.length < 1) {
        this.appAPI.getLesson(lessonHref).subscribe({
          next: (response) => {
            this.coursesStorage.addLesson(response.lesson);
            observer.next('resolved');
            observer.complete();
          },
          error: (error) => {
            console.error(error);
            observer.next('error');
            observer.complete();
          },
        });
      } else {
        observer.next('resolved');
        observer.complete();
      }
    });
  }
}
