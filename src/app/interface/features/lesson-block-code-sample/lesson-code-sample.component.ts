import { Component, input } from '@angular/core';
import { CodeSampleBlock } from '@types';
import { Highlight } from 'ngx-highlightjs';
import { ProgramingLanguagePipe } from '@pipes';

@Component({
  selector: 'app-lesson-code-sample',
  standalone: true,
  imports: [Highlight, ProgramingLanguagePipe],
  templateUrl: './lesson-code-sample.component.html',
  styleUrl: './lesson-code-sample.component.scss',
})
export class LessonCodeSampleComponent {
  object = input.required<CodeSampleBlock>();
}
