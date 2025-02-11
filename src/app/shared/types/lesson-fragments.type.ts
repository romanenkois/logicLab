import { ProgramingLanguage } from "@types";

export type LessonContent =
  | PlainTextBlock
  | ListBlock
  | CodeSampleBlock;

interface LessonBlock {
  type: string;
  position: number;
  object: object;
}

export interface PlainTextBlock extends LessonBlock {
  type: 'plain-text';
  object: {
    title?: string;
    text: string;
  }
}

export interface ListBlock extends LessonBlock {
  type: 'list';
  object: {
    title?: string;
    items: Array<string>;
  }
}

export interface CodeSampleBlock extends LessonBlock {
  type: 'code-sample';
  object: {
    title?: string;
    programmingLanguage?: ProgramingLanguage;
    code: string;
    codeOutput?: string;
  }
}
