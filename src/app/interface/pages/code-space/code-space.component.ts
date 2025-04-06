import { Component, signal, WritableSignal } from '@angular/core';
import { ConsoleConfiguration } from '@types';
import { ConsoleComponent } from '@widgets';

@Component({
  selector: 'app-code-space',
  imports: [ConsoleComponent],
  templateUrl: './code-space.component.html',
  styleUrl: './code-space.component.scss',
})
export default class CodeSpaceComponent {
  defaultEditorSchema: ConsoleConfiguration = {
    name: 'untitled.js',
    programmingLanguage: 'javascript',
    code: 'console.log("Hello logicLab")',
  };

  codeEditors: WritableSignal<ConsoleConfiguration[]> = signal([
    this.defaultEditorSchema,
  ]);
  activeEditor: WritableSignal<string | null> = signal(
    this.defaultEditorSchema.name,
  );

  newEditorButtonAnimation() {
    // creates a new animation to 'new editor' button,
    // when there is no editors left.
    // ensures, so the animation is not stacked
    if (this.codeEditors().length === 0) {
      const createNewButton = document.querySelector('#create-new-tab');
      if (!createNewButton?.classList.contains('highlighted')) {
        createNewButton?.classList.add('highlighted');
        setTimeout(
          () => createNewButton?.classList.remove('highlighted'),
          2000,
        );
      }
    }
  }

  createNewEditor() {
    const newName = `untitled${this.codeEditors().length + 1}.js`;

    const newConsole = {
      ...this.defaultEditorSchema,
      name: newName,
    };
    this.codeEditors.set([...this.codeEditors(), newConsole]);
    this.activeEditor.set(newName);

    // scroll to the end of tab-list, after a short delay to ensure DOM has updated
    setTimeout(() => {
      const tabList = document.querySelector('.tab-list') as HTMLElement;
      if (tabList) {
        tabList.scrollLeft = tabList.scrollWidth;
      }
    });
  }

  removeEditor(name: string) {
    this.codeEditors.set(
      this.codeEditors().filter((editor) => editor.name !== name),
    );
    this.activeEditor.set(null);

    this.newEditorButtonAnimation();
  }

  deleteAllEditors() {
    this.codeEditors.set([]);
    this.activeEditor.set(null);

    this.newEditorButtonAnimation();
  }
}
