import { Component, input, InputSignal } from '@angular/core';
import { ListBlock } from '@types';

@Component({
  selector: 'app-lesson-list',
  imports: [],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss'
})
export class LessonListComponent {
  object: InputSignal<ListBlock> = input.required();
}
