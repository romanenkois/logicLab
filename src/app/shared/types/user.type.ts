export interface UserPrivate {
  id: string;
  email: string;

  // password is not intended to be actually stored
  // present to keep types consistent
  password?: string;

  userInfo: {
    name: string;
    profilePicture?: string;
  };
}

export interface UserPublic {
  id: string;
  userInfo: {
    name: string;
    profilePicture?: string;
  }
}
