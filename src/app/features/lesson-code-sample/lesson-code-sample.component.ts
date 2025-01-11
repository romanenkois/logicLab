import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lesson-code-sample',
  standalone: true,
  imports: [],
  templateUrl: './lesson-code-sample.component.html',
  styleUrl: './lesson-code-sample.component.scss'
})
export class LessonCodeSampleComponent {
  object = input();
}
