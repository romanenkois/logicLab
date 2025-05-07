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
    this.comments.set([...this.comments(), ...comments]);
  }
}
