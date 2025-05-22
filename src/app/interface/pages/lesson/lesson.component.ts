import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { LessonContentComponent } from '@widgets';
import { ActivatedRoute } from '@angular/router';
import { LessonCommentsComponent } from "../../widgets/lesson-comments/lesson-comments.component";

@Component({
  selector: 'app-lesson',
  imports: [LessonContentComponent, LessonCommentsComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export default class LessonComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  courseHref: WritableSignal<string> = signal('');
  lessonHref: WritableSignal<string> = signal('');

  lessonCommentsVisibility: WritableSignal<boolean> = signal(false);

  toggleLessonComments(toggle?: boolean | void) {
    if (toggle) {
      this.lessonCommentsVisibility.set(toggle);
      return;
    }
    this.lessonCommentsVisibility.set(!this.lessonCommentsVisibility());
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.courseHref.set(params['courseHref']);
      this.lessonHref.set(params['lessonHref']);
    });
  }
}
