import { Component } from '@angular/core';
import { CoursesListComponent } from '@widgets';

@Component({
  selector: 'app-courses',
  imports: [CoursesListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export default class CoursesComponent {}
