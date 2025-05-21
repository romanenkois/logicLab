import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseCommand } from '@commands';
import { CoursesStorage } from '@storage';
import { LessonSimple, Lesson, LoadingState } from '@types';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-course-lessons-list',
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './course-lessons-list.component.html',
  styleUrl: './course-lessons-list.component.scss',
})
export class CourseLessonsListComponent implements OnInit {
  private CourseCommand: CourseCommand = inject(CourseCommand);
  private CoursesStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required<string>();
  lessons: InputSignal<LessonSimple[]> = input.required<LessonSimple[]>();
  showDescription: InputSignal<boolean> = input<boolean>(false);

  status: LoadingState = 'idle';

  $lessons: Signal<Lesson[]> = computed(() => {
    return this.lessons().map((lesson: LessonSimple) =>
      this.CoursesStorage.getLesson(lesson.href)
    ).filter(lesson => lesson !== undefined);
  });

  ngOnInit() {
    for (const lesson of this.lessons()) {
      const existingLesson = this.CoursesStorage.getLesson(lesson.href);
      if (!existingLesson || !existingLesson.content || existingLesson.content.length < 1) {
        this.CourseCommand.loadLesson(lesson.href).subscribe((status) => {
          this.status = status;
        });
      }
    }
  }
}
