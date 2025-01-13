import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/app/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {
  private apiUrl = config.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/all-courses-list`);
  }

  public getCourse(courseHref: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/course/${courseHref}`);
  }

  public getLesson(courseHref: string, lessonHref: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/lesson/${courseHref}/${lessonHref}`);
  }
}
