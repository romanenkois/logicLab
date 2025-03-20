import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lesson } from '@types';

@Component({
  selector: 'app-course-lessons-list',
  imports: [ RouterLink ],
  templateUrl: './course-lessons-list.component.html',
  styleUrl: './course-lessons-list.component.scss'
})
export class CourseLessonsListComponent {
  lessons: InputSignal<Lesson[]> = input.required<Lesson[]>();
  showDescription: InputSignal<boolean> = input<boolean>(false);
}
