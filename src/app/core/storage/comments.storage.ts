import { Injectable, signal, WritableSignal } from '@angular/core';
import { LessonComment } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CommentsStorage {
  private readonly comments: WritableSignal<LessonComment[]> = signal<
    LessonComment[]
  >([]);

  public getLessonComments(lessonHref: string): LessonComment[] {
    return this.comments().filter(
      (comment: LessonComment) => comment.lessonHref === lessonHref,
    );
  }

  public addLessonComments(comments: LessonComment[]) {
    const currentComments = this.comments();
    const existingCommentIds = new Set(
      currentComments.map((comment) => comment.id),
    );
    const newComments = comments.filter(
      (comment) => !existingCommentIds.has(comment.id),
    );

    this.comments.set([...currentComments, ...newComments]);
  }
}
