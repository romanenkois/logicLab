import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { $appConfig } from '@environments';
import { CoursesSelectionOption } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CoursesAPI {
  private apiUrl = $appConfig.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public getCourses(CoursesSelectionOption?: CoursesSelectionOption): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/courses/courses-list${
        CoursesSelectionOption ? `?selection=${CoursesSelectionOption}` : ''
      }`
    );
  }

  public getCourse(courseHref: string, getLessons?: boolean): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/courses/course?href=${courseHref}${
        getLessons ? '&getlessons=true' : ''
      }`
    );
  }

  public getLesson(lessonHref: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/lesson?href=${lessonHref}`);
  }
}
