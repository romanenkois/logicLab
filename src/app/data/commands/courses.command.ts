import { inject, Injectable } from '@angular/core';
import { GeneralApiService } from '@api';
import { CoursesStorage } from '@storage';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesCommand {
  private appAPI: GeneralApiService = inject(GeneralApiService);
  private couresesRepository: CoursesStorage = inject(CoursesStorage);

  // public getLesson(courseHref: string, lessonHref: string): Observable<any> {
  //   let lesson = this.couresesRepository.getLesson(courseHref, lessonHref);

  //   if (!lesson) {
  //     this.appAPI.getLesson(courseHref, lessonHref).subscribe((responce) => {
  //       lesson = responce;
  //     })
  //   }

  //   return lesson;
  // }

  public getLesson(courseHref: string, lessonHref: string): Observable<any> {
    const lesson = this.couresesRepository.getLesson(courseHref, lessonHref);

    if (lesson) {
      return of(lesson); // wrap the as Observable
    }

    // Otherwise, fetch the lesson from the API and return it as an Observable
    return this.appAPI.getLesson(courseHref, lessonHref).pipe(
      tap((response) => {
        // this.couresesRepository.saveLesson(courseHref, lessonHref, response);
      })
    );
  }

}
