import { inject, Injectable } from '@angular/core';
import { GeneralApiService } from 'src/app/data/api';
import { CoursesStorage } from '@storage';
import { Course, SelectionOption } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesCommand {
  private appAPI: GeneralApiService = inject(GeneralApiService);
  private coursesStorage: CoursesStorage = inject(CoursesStorage);

  public loadCourse(courseHref: string) {
    console.log('loadCourse', courseHref);
    const courses = this.coursesStorage.getCourse(courseHref);

    if (!courses) {
      this.appAPI.getCourse(courseHref, true).subscribe({
        next: (responce) => {
          console.log('loadCourse', responce);
          this.coursesStorage.addCourse(
            responce.course as Course
          );
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  public loadCourses(selection: SelectionOption) {
    this.appAPI.getCourses(selection).subscribe({
      next: (responce) => {
        console.log('loadCourses', responce);
        responce = responce.courses as Course[];
        responce.forEach((course: Course) => {
          this.coursesStorage.addCourse(
            course
          );
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public loadLesson(lessonHref: string) {
    console.log('loadLesson', lessonHref);
    const lesson = this.coursesStorage.getLesson(lessonHref);

    if (!lesson || !lesson.content || lesson.content.length < 1) {
      this.appAPI.getLesson(lessonHref).subscribe({
        next: (responce) => {
          this.coursesStorage.addLesson(responce.lesson);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
