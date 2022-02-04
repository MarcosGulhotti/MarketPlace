import { Request, Response, NextFunction } from "express";
import { IUserProps } from "../types/user.types";
import { getToken } from "../utils/getToken.utils";

export const verifyIfIsAdm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;
  if (!headers) {
    throw new Error("Missing Authorization Token");
  }

  const decodedToken: IUserProps = getToken(headers);

  if (!decodedToken.isAdm) {
    return res.status(401).json({ message: "User is not an Adm" });
  }

  next();
};
