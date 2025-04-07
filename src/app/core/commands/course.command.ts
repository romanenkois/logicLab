import { inject, Injectable } from '@angular/core';
import { CoursesAPI } from '@api';
import { CoursesStorage } from '@storage';
import { Course, CoursesSelectionOption } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CourseCommand {
  private appAPI: CoursesAPI = inject(CoursesAPI);
  private coursesStorage: CoursesStorage = inject(CoursesStorage);

  public loadCourse(courseHref: string) {
    console.log('loadCourse', courseHref);
    const courses = this.coursesStorage.getCourse(courseHref);

    if (!courses) {
      this.appAPI.getCourse(courseHref, true).subscribe({
        next: (response) => {
          console.log('loadCourse', response);
          this.coursesStorage.addCourse(
            response.course as Course
          );
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  public loadCourses(selection: CoursesSelectionOption) {
    this.appAPI.getCourses(selection).subscribe({
      next: (response) => {
        console.log('loadCourses', response);
        response = response.courses as Course[];
        response.forEach((course: Course) => {
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
        next: (response) => {
          this.coursesStorage.addLesson(response.lesson);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
