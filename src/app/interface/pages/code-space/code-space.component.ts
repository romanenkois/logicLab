import { Component, computed, inject, Signal } from '@angular/core';
import { CodeSpaceService } from '@services';
import { ConsoleConfiguration } from '@types';
import { ConsoleComponent } from '@widgets';

@Component({
  selector: 'app-code-space',
  imports: [ConsoleComponent],
  templateUrl: './code-space.component.html',
  styleUrl: './code-space.component.scss',
})
export default class CodeSpaceComponent {
  private readonly codeSpaceService: CodeSpaceService = inject(CodeSpaceService);

  codeEditors: Signal<ConsoleConfiguration[]> = computed(() => {
    return this.codeSpaceService.getCodeEditors();
  });
  activeEditor: Signal<string | null> = computed(()=>{
    return this.codeSpaceService.getActiveEditor();
  })

  setActiveEditor(name: string) {
    this.codeSpaceService.setActiveEditor(name);
  }

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
    this.codeSpaceService.createNewEditor();

    // scroll to the end of tab-list, after a short delay to ensure DOM has updated
    setTimeout(() => {
      const tabList = document.querySelector('.tab-list') as HTMLElement;
      if (tabList) {
        tabList.scrollLeft = tabList.scrollWidth;
      }
    });
  }

  removeEditor(name: string) {
    this.codeSpaceService.removeEditor(name);

    this.newEditorButtonAnimation();
  }

  deleteAllEditors() {
    this.codeSpaceService.deleteAllEditors();

    this.newEditorButtonAnimation();
  }
}
