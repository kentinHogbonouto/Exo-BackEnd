export interface TokenPayload {
  userId: number;
  userType: UserType;
}

export enum UserType {
  USER = "USER",
}
