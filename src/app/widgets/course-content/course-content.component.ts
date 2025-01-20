import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { CoursesCommand } from '@commands';
import { CoursesStorage } from '@storage';

@Component({
    selector: 'app-course-content',
    imports: [],
    templateUrl: './course-content.component.html',
    styleUrl: './course-content.component.scss'
})
export class CourseContentComponent implements OnInit {
  courseCommand: CoursesCommand = inject(CoursesCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();

  course = computed(() =>
    this.courseStorage.getCourse(this.courseHref())
  );

  ngOnInit() {

  }
}
