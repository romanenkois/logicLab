import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {
  private apiUrl = config.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/courses-list`);
  }

  public getCourse(courseHref: string, getLessons?: boolean): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/course?course=${courseHref}${getLessons ? '&getLessons=true' : ''}`);
  }

  public getLesson(courseHref: string, lessonHref: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/courses/lesson?course=${courseHref}&lesson=${lessonHref}`);
  }
}
