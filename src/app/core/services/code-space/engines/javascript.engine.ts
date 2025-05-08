import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JavascriptEngine {
  private readonly timeoutThreshold = 5000;

  async executeCode(userCode: string): Promise<{
    output: {
      type: 'log' | 'warn' | 'error';
      message: string;
    }[];
    executionTime?: number;
  }> {
    return new Promise((resolve) => {
      const workerScript = `
        self.onmessage = function(e) {
          const userCode = e.data;
          const messages = [];
          const startTime = performance.now();

          const customConsole = {
            log: (...args) => {
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
            warn: (...args) => {
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
            error: (...args) => {
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
            }
          };

          try {
            const executeUserCode = new Function(
              'console',
              '"use strict";\\n' + userCode
            );
            executeUserCode(customConsole);

            const executionTime = performance.now() - startTime;
            self.postMessage({ output: messages, executionTime: executionTime });
          } catch (error) {
            messages.push({ type: 'error', message: String(error) });
            self.postMessage({ output: messages });
          }
        };
      `;

      const blob = new Blob([workerScript], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      // We set up the timeout promise, so it would surely execute if not stopped then manually
      const timeoutId = setTimeout(() => {
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        resolve({
          output: [
            {
              type: 'error',
              message:
                'Execution timed out after' + this.timeoutThreshold + 'ms',
            },
          ],
        });
      }, this.timeoutThreshold);

      worker.onmessage = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        resolve({
          output: e.data.output,
          executionTime: e.data.executionTime,
        });
      };
      worker.onerror = (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        resolve({
          output: [{ type: 'error', message: e.message }],
        });
      };

      worker.postMessage(userCode);
    });
  }
}
