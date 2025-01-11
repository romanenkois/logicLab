import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { CoursesCommand } from '@commands';
import { Observable } from 'rxjs';
import { LessonPlainTextComponent } from "../../features/lesson-plain-text/lesson-plain-text.component";
import { LessonCodeSampleComponent } from "../../features/lesson-code-sample/lesson-code-sample.component";

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  imports: [LessonPlainTextComponent, LessonCodeSampleComponent],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss'
})
export class LessonContentComponent implements OnInit {
  courseCommand: CoursesCommand = inject(CoursesCommand);

  courseHref: InputSignal<string> = input.required();
  lessonHref: InputSignal<string> = input.required();

  lesson: any;

  ngOnInit(): void {
    this.courseCommand.getLesson(this.courseHref(), this.lessonHref()).subscribe((responce)=>{
      this.lesson = responce;
      console.log(this.lesson);
    });
  }
}
