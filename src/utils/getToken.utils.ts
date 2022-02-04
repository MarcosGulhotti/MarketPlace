import jwt_decode from "jwt-decode";
import { IUserProps } from "../types/user.types";

export interface IJwtDecode {
  user: IUserProps;
  iat: number;
  exp: number;
}

export const getToken = (token: string) => {
  const newToken = token.split(" ")[1];

  const decodedToken: IJwtDecode = jwt_decode(newToken);
  
  return decodedToken.user;
};
