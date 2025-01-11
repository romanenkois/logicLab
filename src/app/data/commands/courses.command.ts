import { inject, Injectable } from '@angular/core';
import { GeneralApiService } from '@api';
import { CoursesStorage } from '@storage';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesCommand {
  private appAPI: GeneralApiService = inject(GeneralApiService);
  private couresesRepository: CoursesStorage = inject(CoursesStorage);

  public getLesson(courseHref: string, lessonHref: string): Observable<any> {
    const lesson = this.couresesRepository.getLesson(courseHref, lessonHref);
    if (lesson) {
        return of(lesson);
    }

    return this.appAPI.getLesson(courseHref, lessonHref).pipe(
        catchError(error => {
            throw error;
        })
    );
  }
}
