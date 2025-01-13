import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { LessonContentComponent } from "../../widgets/lesson-content/lesson-content.component";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lesson',
    imports: [LessonContentComponent],
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss'
})
export default class LessonComponent implements OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  courseHref: WritableSignal<string> = signal('');
  lessonHref: WritableSignal<string> = signal('');

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.courseHref.set(params['courseHref']);
      this.lessonHref.set(params['lessonHref']);
    });
  }
}
