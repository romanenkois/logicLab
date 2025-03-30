import { Component, input, InputSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgramingLanguage } from '@types';

@Component({
  selector: 'app-console',
  imports: [FormsModule],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss',
})
export class ConsoleComponent {
  programingLanguage: InputSignal<ProgramingLanguage> = input.required();

  userCode = '';
  output: string = '';

  executeCode() {
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(
          JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
              )
              .join(' '),
          )
        );
      },
      warn: (...args: any[]) => {
        logs.push(
          JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
              )
              .join(' '),
          )
        );
      },
      error: (...args: any[]) => {
        logs.push(
          JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
              )
              .join(' '),
          )
        );
      }
    };

    try {
      // Create a safe execution context
      const executeUserCode = new Function(
        'console',

        `
          "use strict";
          try {
            ${this.userCode}
          } catch {
            throw new Error('Error while running your code');
          }
        `
      );

      // Execute the code with our custom console

      executeUserCode(customConsole);

      // Display the output
      this.output = logs.join('\n');
    } catch (error) {
      this.output = `Error:\n${(error as Error).message}`;
    }
  }
}
