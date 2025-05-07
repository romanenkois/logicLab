import { inject, Injectable } from '@angular/core';
import { CommentsAPI } from '@api';
import { CommentsStorage, TokenStorage } from '@storage';
import { LessonComment, LoadingState, UploadingState } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsCommand {
  private commentsApi: CommentsAPI = inject(CommentsAPI);
  private commentsStorage: CommentsStorage = inject(CommentsStorage);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  public loadLessonComments(lessonHref: string): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      this.commentsApi.getLessonComments(lessonHref).subscribe({
        next: (response) => {
          if (response.comments) {
            this.commentsStorage.addLessonComments(response.comments);
          }
          observer.next('resolved');
          observer.complete();
        },
        error: () => {
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public postNewComment(
    comment: Omit<LessonComment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  ): Observable<UploadingState> {
    return new Observable<UploadingState>((observer) => {
      observer.next('uploading');

      const userToken = '213'
      // this.tokenStorage.getToken();

      if (!userToken) {
        observer.next('error');
        observer.complete();
        return;
      }

      this.commentsApi.postNewComment(comment, userToken).subscribe({
        next: (response) => {
          this.commentsStorage.addLessonComments([response]);
          observer.next('resolved');
          observer.complete();
        },
        error: () => {
          observer.next('error');
          observer.complete();
        },
      });
    });
  }
}
