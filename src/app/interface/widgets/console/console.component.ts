import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConsoleConfiguration } from '@types';
import { ProgrammingLanguagePipe } from '@pipes';
import { $appConfig } from '@environments';
import { CodeSpaceService } from '@services';

@Component({
  selector: 'app-console',
  imports: [FormsModule, ProgrammingLanguagePipe],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
})
export class ConsoleComponent implements OnInit {
  private readonly codeSpaceService: CodeSpaceService =
    inject(CodeSpaceService);

  consoleConfiguration: InputSignal<ConsoleConfiguration> = input.required();

  code: string = '';

  output: {
    type: 'log' | 'warn' | 'error';
    message: string;
  }[] = [];

  availableEngines = $appConfig.codeEditor.supportedLanguages;

  saveCode() {
    this.codeSpaceService.setCodeEditors(
      this.codeSpaceService.getCodeEditors().map((editor) => {
        if (editor.name === this.consoleConfiguration().name) {
          return {
            ...editor,
            code: this.code,
          };
        }
        return editor;
      }),
    );
  }

  async executeCode() {
    if (this.consoleConfiguration().programmingLanguage === 'javascript') {
      const result = await import('./engines/javascript.engine').then(
        ({ JavascriptEngine }) => {
          const javascriptEngine = new JavascriptEngine();
          return javascriptEngine.executeCode(this.code);
        },
      );
      this.output = result.output;
    } else {
      this.output = [
        { type: 'error', message: 'Unsupported programming language' },
      ];
    }
  }

  ngOnInit() {
    this.code = this.consoleConfiguration().code;
  }
}
