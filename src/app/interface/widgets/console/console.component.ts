import { Component, input, InputSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramingLanguage } from '@types';
import { ProgramingLanguagePipe } from '@pipes';
import { config } from '@environments';

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

  availableEngines = config.codeEditor.suportedLanguages;

  async executeCode() {
    console.log(this.availableEngines)

    if (this.programingLanguage() === 'javascript') {
      const result = await import('./engines/javascript.engine').then(
        ({ JavascriptEngine }) => {
          const javascriptEngine = new JavascriptEngine();
          return javascriptEngine.executeCode(this.userCode);
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
