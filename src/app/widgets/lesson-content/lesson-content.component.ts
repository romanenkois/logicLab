import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { CoursesCommand } from '@commands';

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  imports: [],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss'
})
export class LessonContentComponent {
  courseCommand: CoursesCommand = inject(CoursesCommand);

  courseHref: InputSignal<string> = input.required();
  lessonHref: InputSignal<string> = input.required();

  lessonContent = computed(() => {
    return this.courseCommand.getLesson(
      this.courseHref(), this.lessonHref()
    );
  })

}
