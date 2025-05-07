type Attachment =
  // | {
  //     type: 'image';
  //     url: string;
  //   }
  | {
      type: 'code';
      code: string;
      programmingLanguage: string;
    };

export interface LessonComment {
  id: string;
  lessonHref: string;
  parentCommentId: string | null; // null if its the parental comment
  userId: string;

  text: string;
  attachments?: Attachment[];

  createdAt: Date;
  updatedAt: Date;
};
