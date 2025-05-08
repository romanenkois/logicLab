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
    console.log('Adding comments:', comments);
    const currentComments = this.comments();

    // Create a Set of existing comment IDs
    const existingCommentIds = new Set(currentComments.map(comment => comment.id));

    // Only add comments that don't exist yet
    const newComments = comments.filter(comment => !existingCommentIds.has(comment.id));

    // Combine existing and new comments
    const mergedComments = [...currentComments, ...newComments];

    console.log('Merged comments:', mergedComments);
    this.comments.set(mergedComments);
  }
}
