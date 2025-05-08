import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { $appConfig } from '@environments';
import { CodeSpaceService } from '@services';
import { CodeSampleBlock } from '@types';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-lesson-code-sample',
  standalone: true,
  imports: [Highlight],
  templateUrl: './lesson-code-sample.component.html',
  styleUrl: './lesson-code-sample.component.scss',
})
export class LessonCodeSampleComponent {
  private router: Router = inject(Router);
  private codeSpaceService: CodeSpaceService = inject(CodeSpaceService);

  object: InputSignal<CodeSampleBlock> = input.required<CodeSampleBlock>();

  // checks, if the programing language is licted as supported
  // affects the run button
  isRunnable = computed(() => {
    const programmingLanguage = this.object().object.programmingLanguage;
    if (
      programmingLanguage &&
      $appConfig.codeEditor.supportedLanguages.includes(programmingLanguage)
    ) {
      return true;
    }
    return false;
  });


  runInEdditor() {
    this.codeSpaceService.createNewEditor({
      programmingLanguage: this.object().object.programmingLanguage ?? 'javascript',
      code: this.object().object.code,
    })
    this.router.navigate(['code-space']);
  }
}
