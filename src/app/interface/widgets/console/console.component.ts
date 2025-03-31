import { Component, input, InputSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramingLanguage } from '@types';
import { ProgramingLanguagePipe } from '@pipes';

@Component({
  selector: 'app-console',
  imports: [FormsModule, ProgramingLanguagePipe],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
})
export class ConsoleComponent {
  programingLanguage: InputSignal<ProgramingLanguage> = input.required();

  userCode = '';
  output: {
    type: 'log' | 'warn' | 'error';
    message: string;
  }[] = [];

  async executeCode() {
    if (this.programingLanguage() === 'javascript') {
      const result = await import('./services/javascript.service').then(
        ({ JavascriptService }) => {
          const javascriptService = new JavascriptService();
          return javascriptService.executeCode(this.userCode);
        },
      );
      this.output = result.output;
    } else {
      this.output = [
        { type: 'error', message: 'Unsupported programming language' },
      ];
    }
  }
}
