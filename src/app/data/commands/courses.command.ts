import { inject, Injectable } from '@angular/core';
import { GeneralApiService } from '@api';
import { CoursesStorage } from '@storage';

@Injectable({
  providedIn: 'root'
})
export class CoursesCommand {
  private appAPI: GeneralApiService = inject(GeneralApiService);
  private couresesRepository: CoursesStorage = inject(CoursesStorage);

  public loadCourse(courseHref: string) {
    const courses = this.couresesRepository.getCourse(courseHref);

    if (!courses) {
      this.appAPI.getCourse(courseHref).subscribe(
        (responce) => {
          this.couresesRepository.addCourse(responce['course']);
        }, (error) => {
          console.error(error);
        }
      )
    }
  }

  public loadLesson(courseHref: string, lessonHref: string) {

    console.log('loading lesson', lessonHref);
    this.appAPI.getLesson(courseHref, lessonHref).subscribe(
      (responce) => {
        this.couresesRepository.addLesson(responce['lesson']);
      }, (error) => {
        console.error(error);
      }
    )
  }
}
