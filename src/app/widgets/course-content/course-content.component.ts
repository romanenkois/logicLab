import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { CoursesCommand } from '@commands';
import { Course } from '@models';

@Component({
    selector: 'app-course-content',
    imports: [],
    templateUrl: './course-content.component.html',
    styleUrl: './course-content.component.scss'
})
export class CourseContentComponent {
  courseCommand: CoursesCommand = inject(CoursesCommand);

  courseHref: InputSignal<string> = input.required();

  // course: Signal<Course | undefined> = computed(() => {
  //   const course = this.courseCommand.getCourse(this.courseHref());
  //   if (!course) {
  //     throw new Error('Course not found');
  //   }
  //   return course;
  // });
}
