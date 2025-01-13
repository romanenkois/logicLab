import { Component, computed, inject, input, InputSignal, OnInit, Signal } from '@angular/core';
import { CoursesCommand } from '@commands';
import { LessonPlainTextComponent } from "../../features/lesson-plain-text/lesson-plain-text.component";
import { LessonCodeSampleComponent } from "../../features/lesson-code-sample/lesson-code-sample.component";
import { CoursesStorage } from '@storage';

@Component({
    selector: 'app-lesson-content',
    imports: [LessonPlainTextComponent, LessonCodeSampleComponent],
    templateUrl: './lesson-content.component.html',
    styleUrl: './lesson-content.component.scss'
})
export class LessonContentComponent implements OnInit {
  courseCommand: CoursesCommand = inject(CoursesCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();
  lessonHref: InputSignal<string> = input.required();

  lesson = computed(() =>
    this.courseStorage.getLesson(this.courseHref(), this.lessonHref())
  );

  ngOnInit() {
    this.courseCommand.loadLesson(this.courseHref(), this.lessonHref());
  }
}
