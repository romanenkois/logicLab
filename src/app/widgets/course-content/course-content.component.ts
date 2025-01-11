import { Component, inject } from '@angular/core';
import { CoursesCommand } from '@commands';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss'
})
export class CourseContentComponent {
  courseCommand: CoursesCommand = inject(CoursesCommand);

  
}
