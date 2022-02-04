export interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordCode: string;
  resetPasswordExpires: Date;
}
