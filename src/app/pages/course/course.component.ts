import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseContentComponent } from "../../widgets/course-content/course-content.component";

@Component({
    selector: 'app-course',
    imports: [CourseContentComponent],
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss'
})
export default class CourseComponent {
  activeRouter: ActivatedRoute = inject(ActivatedRoute);

  courseHref: WritableSignal<string> = signal('');

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.courseHref.set(params['courseHref']);
    });
  }
}
