export interface User {
  email: string;

  // is not intended to be actually stored
  // kept to keep types consistent
  password?: string;

  userInfo: {
    name: string;
    profilePicture?: string;
  };
}
