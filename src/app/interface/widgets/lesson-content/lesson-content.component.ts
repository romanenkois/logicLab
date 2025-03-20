import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { CoursesCommand } from '@commands';
import { LessonPlainTextComponent, LessonCodeSampleComponent, LessonListComponent } from "@features";
import { CoursesStorage } from '@storage';

@Component({
  selector: 'app-lesson-content',
  imports: [LessonPlainTextComponent, LessonCodeSampleComponent, LessonListComponent],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss'
})
export class LessonContentComponent implements OnInit {
  courseCommand: CoursesCommand = inject(CoursesCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();
  lessonHref: InputSignal<string> = input.required();

  lesson = computed(() => {
    if (this.courseHref() && this.lessonHref()) {
      return this.courseStorage.getLesson(this.lessonHref());
    }
    return undefined;
  });

  ngOnInit() {
    console.log('lesson content init');
    this.courseCommand.loadLesson(this.lessonHref());
  }
}
