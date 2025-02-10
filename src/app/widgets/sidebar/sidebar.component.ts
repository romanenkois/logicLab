import { Component, signal, WritableSignal } from '@angular/core';
import { CourseLessonsListComponent } from '@features';
import { Lesson } from '@types';

@Component({
  selector: 'app-sidebar',
  imports: [CourseLessonsListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  lessons: WritableSignal<Lesson[]> = signal([]);
}
