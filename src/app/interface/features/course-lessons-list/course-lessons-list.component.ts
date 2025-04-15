import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseCommand } from '@commands';
import { CoursesStorage } from '@storage';
import { LessonSimple, Lesson } from '@types';

@Component({
  selector: 'app-course-lessons-list',
  imports: [RouterLink],
  templateUrl: './course-lessons-list.component.html',
  styleUrl: './course-lessons-list.component.scss',
})
export class CourseLessonsListComponent {
  private CourseCommand: CourseCommand = inject(CourseCommand);
  private CoursesStorage: CoursesStorage = inject(CoursesStorage);

  courseHref: InputSignal<string> = input.required<string>();
  lessons: InputSignal<LessonSimple[]> = input.required<LessonSimple[]>();
  showDescription: InputSignal<boolean> = input<boolean>(false);

  $lessons: Signal<Lesson[]> = computed(() => {
    return this.lessons().map((lesson: LessonSimple) => {
      this.CourseCommand.loadLesson(lesson.href).subscribe((status) => {
        console.log('loadLesson', status);
      });
      return this.CoursesStorage.getLesson(lesson.href);
    });
  });
}
