import { Injectable, signal, WritableSignal } from '@angular/core';
import { ConsoleConfiguration } from '@types';

@Injectable({
  providedIn: 'root',
})
export class CodeSpaceService {
  defaultEditorSchema: ConsoleConfiguration = {
    name: 'untitled.js',
    programmingLanguage: 'javascript',
    code: 'console.log("Hello logicLab")',
  };

  private codeEditors: WritableSignal<ConsoleConfiguration[]> = signal([
    this.defaultEditorSchema,
  ]);
  private activeEditor: WritableSignal<string | null> = signal(
    this.defaultEditorSchema.name,
  );

  public getCodeEditors() {
    return this.codeEditors();
  }
  public setCodeEditors(codeEditors: ConsoleConfiguration[]) {
    this.codeEditors.set(codeEditors);
  }
  public addNewEditor(editor: ConsoleConfiguration) {
    this.codeEditors.set([...this.codeEditors(), editor]);
    this.activeEditor.set(editor.name);
  }

  public getActiveEditor() {
    return this.activeEditor();
  }
  public setActiveEditor(name: string) {
    this.activeEditor.set(name);
  }

  public createNewEditor(editor?: {
    name?: string;
    programmingLanguage: ConsoleConfiguration['programmingLanguage'];
    code?: string;
  }) {
    const newName = `untitled${this.codeEditors().length + 1}.js`;

    let newEditor: ConsoleConfiguration | undefined;
    if (editor) {
      newEditor = {
        code: editor.code ? editor.code : this.defaultEditorSchema.code,
        name: editor.name ? editor.name : newName,
        programmingLanguage: editor.programmingLanguage
          ? editor.programmingLanguage
          : this.defaultEditorSchema.programmingLanguage,
      };
    } else {
      newEditor = {
        ...this.defaultEditorSchema,
        name: newName,
      };
    }
    this.codeEditors.set([...this.codeEditors(), newEditor]);
    this.activeEditor.set(newName);
  }

  public removeEditor(name: string) {
    this.codeEditors.set(
      this.codeEditors().filter((editor) => editor.name !== name),
    );
    this.activeEditor.set(null);
  }

  public deleteAllEditors() {
    this.codeEditors.set([]);
    this.activeEditor.set(null);
  }

  // public async executeCode(name: ConsoleConfiguration['name']): Promise<{
  //   type: 'log' | 'warn' | 'error';
  //   message: string;
  // }[]> {
  //   const editor: ConsoleConfiguration | undefined = this.codeEditors().find(
  //     (editor) => editor.name === name,
  //   );
  //   if (!editor) {
  //     return [{ type: 'error', message: 'Editor not found' }];
  //   }

  //   switch (editor?.programmingLanguage) {
  //     case 'javascript': {
  //       const result = await import('./engines/javascript.engine').then(
  //         ({ JavascriptEngine: JavascriptEngine }) => {
  //           return new JavascriptEngine().executeCode(editor.code);
  //         },
  //       );
  //       return result.output;
  //       break;
  //     }
  //     default: {
  //       return [{ type: 'error', message: 'Unsupported programming language' }];
  //       break;
  //     }

  //   }
  // }
}
