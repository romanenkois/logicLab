import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseCommand } from '@commands';
import { ProgrammingLanguagePipe } from '@pipes';
import { CoursesStorage } from '@storage';
import { LoadingState } from '@types';

@Component({
  selector: 'app-courses-list',
  imports: [ProgrammingLanguagePipe, RouterLink],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  private coursesCommand: CourseCommand = inject(CourseCommand);
  private coursesStorage: CoursesStorage = inject(CoursesStorage);

  courses = computed(() => {
    return this.coursesStorage.getCourses();
  });

  state: LoadingState = 'idle';

  ngOnInit(): void {
    // if (this.coursesStorage.getCourses().length < 1) {
      this.coursesCommand
        .loadCourses('all')
        .subscribe((status: LoadingState) => {
          this.state = status;
        });
    // }
  }
}
