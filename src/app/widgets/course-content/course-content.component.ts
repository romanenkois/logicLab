import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesCommand } from '@commands';
import { CoursesStorage } from '@storage';
import { CourseLessonsListComponent } from "@features";

@Component({
  selector: 'app-course-content',
  imports: [ RouterModule, CourseLessonsListComponent ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss'
})
export class CourseContentComponent implements OnInit {
  courseCommand: CoursesCommand = inject(CoursesCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();

  course = computed(() => {
    try {
      if (this.courseHref() && this.courseHref() !== '') {
        return this.courseStorage.getCourse(this.courseHref())
      }
      throw new Error('Course href is not defined');
    } catch (error) {
      console.error(error);
      return;
    }
  });

  ngOnInit() {
    this.courseCommand.loadCourse(this.courseHref());
  }
}
