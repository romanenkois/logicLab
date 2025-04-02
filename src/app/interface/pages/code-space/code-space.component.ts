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
  defaultEdditorSchema: ConsoleConfiguration = {
    name: 'untitled.js',
    programingLanguage: 'javascript',
    code: 'console.log("Hello logicLab")',
  };

  codeEdditors: WritableSignal<ConsoleConfiguration[]> = signal([
    this.defaultEdditorSchema,
  ]);
  activeEdditor: WritableSignal<string | null> = signal(
    this.defaultEdditorSchema.name,
  );

  newEdditorButtonAnimation() {
    // creates a new animetion to 'new edditor' button,
    // when there is no ediitors left.
    // ensures, so the animation is not stacked
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

  createNewEditor() {
    const newName = `untitled${this.codeEdditors().length + 1}.js`;

    const newConsole = {
      ...this.defaultEdditorSchema,
      name: newName,
    };
    this.codeEdditors.set([...this.codeEdditors(), newConsole]);
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

    this.newEdditorButtonAnimation();
  }

  deleteAllEdditors() {
    this.codeEdditors.set([]);
    this.activeEdditor.set(null);

    this.newEdditorButtonAnimation();
  }
}
