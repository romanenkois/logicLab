import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JavascriptEngine {
  async executeCode(userCode: string): Promise<{
    output: {
      type: 'log' | 'warn' | 'error';
      message: string;
    }[];
  }> {
    const messages: {
      type: 'log' | 'warn' | 'error';
      message: string;
    }[] = [];

    const customConsole = {
      log: (...args: any[]) => {
        messages.push({
          type: 'log',
          message: JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
              )
              .join(' '),
          ),
        });
      },
      warn: (...args: any[]) => {
        messages.push({
          type: 'warn',
          message: JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
              )
              .join(' '),
          ),
        });
      },
      error: (...args: any[]) => {
        messages.push({
          type: 'error',
          message: JSON.stringify(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
              )
              .join(' '),
          ),
        });
      },
    };

    try {
      const executeUserCode = new Function(
        'console',
        `
          // "use strict" // i dont know is it really needed
          ${userCode}
        `,
      );
      executeUserCode(customConsole);

      return { output: messages };
    } catch (error) {
      messages.push({ type: 'error', message: String(error) });
      return { output: messages };
    }
  }
}
