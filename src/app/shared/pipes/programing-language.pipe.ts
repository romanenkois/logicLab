import { Pipe, PipeTransform } from '@angular/core';
import { ProgramingLanguage } from '@types';

@Pipe({
  name: 'programingLanguage',
})
export class ProgramingLanguagePipe implements PipeTransform {
  transform(value: unknown): string {
    switch (value as string as ProgramingLanguage) {
      case 'javascript':
        return 'JavaScript';
      case 'typescript':
        return 'TypeScript';
      case 'python':
        return 'Python';
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';

      default:
        return 'Unknown Language';
    }
  }
}
