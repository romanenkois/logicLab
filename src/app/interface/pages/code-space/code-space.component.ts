import { Component, signal, WritableSignal } from '@angular/core';
import { ProgramingLanguage } from '@types';
import { ConsoleComponent } from '@widgets';

@Component({
  selector: 'app-code-space',
  imports: [ConsoleComponent],
  templateUrl: './code-space.component.html',
  styleUrl: './code-space.component.scss',
})
export default class CodeSpaceComponent {
  defaultName = 'untitled.js';

  codeEdditors: WritableSignal<
    {
      name: string;
      programingLanguage: ProgramingLanguage;
    }[]
  > = signal([{ name: this.defaultName, programingLanguage: 'javascript' }]);
  activeEdditor: WritableSignal<string | null> = signal(this.defaultName);

  createNewEditor() {
    const newName = `untitled${this.codeEdditors().length + 1}.js`;

    this.codeEdditors.set([
      ...this.codeEdditors(),
      {
        name: newName,
        programingLanguage: 'javascript',
      },
    ]);
    this.activeEdditor.set(newName);

    // scroll to the end of tab-list, after a short delay to ensure DOM has updated
    setTimeout(() => {
      const tabList = document.querySelector('.tab-list') as HTMLElement;
      if (tabList) {
        tabList.scrollLeft = tabList.scrollWidth;
      }
    });
  }

  rremoveEdditor(name: string) {
    this.codeEdditors.set(
      this.codeEdditors().filter((editor) => editor.name !== name),
    );
    this.activeEdditor.set(null);

    if (this.codeEdditors().length === 0) {
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
}
