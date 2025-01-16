import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-console-javascript',
  imports: [ FormsModule ],
  templateUrl: './console-javascript.component.html',
  styleUrl: './console-javascript.component.scss'
})
export class ConsoleJavascriptComponent {
  userCode: string = '';
  output: string = '';

  executeCode() {
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
      }
    };

    try {
      // Create a safe execution context
      const executeUserCode = new Function('console', `
        "use strict";
        ${this.userCode}
      `);

      // Execute the code with our custom console
      executeUserCode(customConsole);

      // Display the output
      this.output = logs.join('\n');
    } catch (error) {
      this.output = `Error: ${(error as Error).message}`;
    }
  }
}
