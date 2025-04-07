import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCommand } from '@commands';
import { CoursesStorage } from '@storage';
import { CourseLessonsListComponent } from "@features";

@Component({
  selector: 'app-course-content',
  imports: [RouterModule, CourseLessonsListComponent],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss'
})
export class CourseContentComponent implements OnInit {
  courseCommand: CourseCommand = inject(CourseCommand);
  courseStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required();

  course = computed(() => {
    return this.courseStorage.getCourse(this.courseHref())
  });

  ngOnInit() {
    console.log('course content init');
    this.courseCommand.loadCourse(this.courseHref());
  }
}
