import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { $appConfig } from '@environments';
import { LessonComment } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CommentsAPI {
  private apiUrl = $appConfig.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public getLessonComments(lessonHref: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/comments/lesson-comments?lessonhref=${lessonHref}`,
    );
  }

  public postNewComment(
    comment: Omit<LessonComment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
    userToken: string,
  ): Observable<any> {
    const body = {
      comment: comment,
    };
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    return this.http.post(`${this.apiUrl}/comments/post-comment`, body, {
      headers,
    });
  }
}
