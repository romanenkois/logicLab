export type LoadingState =
  | 'idle'
  | 'loading'
  | 'resolved'
  | 'all-resolved'
  | 'error'
  | 'unauthorized';

export type UploadingState =
  | 'idle'
  | 'uploading'
  | 'resolved'
  | 'unauthorized'
  | 'error';

export type RegistrationState =
  | 'idle'
  | 'loading'
  | 'resolved'
  | 'error'
  | 'userAlreadyExists'
  | 'invalidData';

export type LoginState =
  | 'idle'
  | 'loading'
  | 'resolved'
  | 'error'
  | 'invalidData';
