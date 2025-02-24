export interface IUser {
  _id?: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
