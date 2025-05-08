import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCommand } from '@commands';
import { CoursesStorage } from '@storage';
import { CourseLessonsListComponent } from "@features";
import { LoadingState } from '@types';

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

  status: LoadingState = 'idle';

  course = computed(() => {
    return this.courseStorage.getCourse(this.courseHref())
  });

  ngOnInit() {
    this.courseCommand.loadCourse(this.courseHref()).subscribe((status: LoadingState) => {
      this.status = status;
    });
  }
}
