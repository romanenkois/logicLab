import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  InputSignal,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsCommand } from '@commands';
import { ScreenNotificationService } from '@services';
import { CommentsStorage } from '@storage';
import { LoadingState, UploadingState } from '@types';
import { UserCardComponent } from '@features';

@Component({
  selector: 'app-lesson-comments',
  imports: [FormsModule, UserCardComponent],
  templateUrl: './lesson-comments.component.html',
  styleUrl: './lesson-comments.component.scss',
})
export class LessonCommentsComponent implements OnInit {
  private commentsCommand: CommentsCommand = inject(CommentsCommand);
  private commentsStorage: CommentsStorage = inject(CommentsStorage);
  private screenNotifications: ScreenNotificationService = inject(
    ScreenNotificationService,
  );

  lessonHref: InputSignal<string> = input.required();
  @Output() toggleVisibilityEvent = new EventEmitter<boolean | void>();

  loadingStatus: LoadingState = 'idle';
  uploadingStatus: UploadingState = 'idle';

  newComment: string = '';

  comments = computed(() => {
    return this.commentsStorage.getLessonComments(this.lessonHref());
  });

  closeWindow() {
    this.toggleVisibilityEvent.emit(false);
  }

  toggleVisibility() {
    this.toggleVisibilityEvent.emit();
  }

  postNewComment() {
    if (this.newComment && this.lessonHref() && this.newComment.trim() !== '') {
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
            this.screenNotifications.sendMessage({
              title: 'Готово',
              text: 'Коментар успішно опубліковано',
              buttonText: 'ок',
            });
          }
          if (status === 'error') {
            this.screenNotifications.sendMessage({
              title: 'Помилка',
              text: 'Помилка під час публікації коментаря',
              buttonText: 'ой',
            });
          }
          if (status === 'unauthorized') {
            this.screenNotifications.sendMessage({
              title: 'Помилка авторизації',
              text: 'Вам потрібно бути залогіненим, щоб залишити коментар',
              buttonText: 'ой',
            });
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
