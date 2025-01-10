import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export default class CourseComponent {
  activeRouter: ActivatedRoute = inject(ActivatedRoute);

  courseType: string = '';
  courseId: string = '';

  ngOnInit() {
    this.activeRouter.url.subscribe((url) => {
      this.courseType = url[1].path;
      this.courseId = url[2].path;
    });
  }
}
