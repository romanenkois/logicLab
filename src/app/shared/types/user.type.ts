export interface User {
  email: string;

  // password is not intended to be actually stored
  // present to keep types consistent
  password?: string;

  token?: string;

  userInfo: {
    name: string;
    profilePicture?: string;
  };
}
