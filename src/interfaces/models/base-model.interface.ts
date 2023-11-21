export interface BaseModel {
  id: string;
  username: string;
  email: string;
  password?: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  resetPasswordRequestId?: string;
}
