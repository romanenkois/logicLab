import { Component, input } from '@angular/core';
import { PlainTextBlock } from '@types';

@Component({
    selector: 'app-lesson-plain-text',
    imports: [],
    templateUrl: './lesson-plain-text.component.html',
    styleUrl: './lesson-plain-text.component.scss'
})
export class LessonPlainTextComponent {
  object = input.required<PlainTextBlock>();
}
