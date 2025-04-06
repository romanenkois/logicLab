import { Pipe, PipeTransform } from '@angular/core';
import { ProgrammingLanguage } from '@types';

@Pipe({
  name: 'programmingLanguage',
})
export class ProgrammingLanguagePipe implements PipeTransform {
  transform(value: unknown): string {
    switch (value as string as ProgrammingLanguage) {
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
