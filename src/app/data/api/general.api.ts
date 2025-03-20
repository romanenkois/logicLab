import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '@environments';
import { SelectionOption } from '@types';

@Injectable({
  providedIn: 'root',
})
export class GeneralApiService {
  private apiUrl = config.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public getCourses(selectionOption?: SelectionOption): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/courses/courses-list${
        selectionOption ? `?selection=${selectionOption}` : ''
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
