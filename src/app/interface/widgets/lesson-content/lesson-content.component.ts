import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { CourseCommand } from '@commands';
import {
  LessonPlainTextComponent,
  LessonCodeSampleComponent,
  LessonListComponent,
} from '@features';
import { CoursesStorage } from '@storage';
import { LoadingState } from '@types';

@Component({
  selector: 'app-lesson-content',
  imports: [
    LessonPlainTextComponent,
    LessonCodeSampleComponent,
    LessonListComponent,
  ],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss',
})
export class LessonContentComponent implements OnInit {
  courseCommand: CourseCommand = inject(CourseCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();
  lessonHref: InputSignal<string> = input.required();

  status: LoadingState = 'idle';

  lesson = computed(() => {
    return this.courseStorage.getLesson(this.lessonHref());
  });

  ngOnInit() {
    this.courseCommand
      .loadLesson(this.lessonHref())
      .subscribe((status: LoadingState) => {
        this.status = status;
      });
  }
}
