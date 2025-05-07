import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsCommand } from '@commands';
import { CommentsStorage } from '@storage';
import { LoadingState, UploadingState } from '@types';

@Component({
  selector: 'app-lesson-comments',
  imports: [FormsModule],
  templateUrl: './lesson-comments.component.html',
  styleUrl: './lesson-comments.component.scss',
})
export class LessonCommentsComponent implements OnInit {
  readonly commentsCommand: CommentsCommand = inject(CommentsCommand);
  readonly commentsStorage: CommentsStorage = inject(CommentsStorage);

  lessonHref: InputSignal<string> = input.required();

  loadingStatus: LoadingState = 'idle';
  uploadingStatus: UploadingState = 'idle';

  newComment: string = '';

  comments = computed(() => {
    return this.commentsStorage.getLessonComments(this.lessonHref());
  });

  postNewComment() {
    console.log('Posting new comment:', this.newComment);
    if (this.newComment && this.lessonHref() && this.newComment.trim() !== '') {
      console.log('Posting new comment:', this.newComment);
      this.commentsCommand
        .postNewComment({
          lessonHref: this.lessonHref(),
          parentCommentId: null,
          text: this.newComment,
        })
        .subscribe((status: UploadingState) => {
          this.uploadingStatus = status;
          if (status === 'resolved') {
            this.newComment = '';
          }
        });
    }
  }

  ngOnInit() {
    this.commentsCommand
      .loadLessonComments(this.lessonHref())
      .subscribe((status: LoadingState) => {
        this.loadingStatus = status;
      });
  }
}
