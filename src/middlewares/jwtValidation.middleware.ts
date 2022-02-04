import { NextFunction, Request, Response } from "express";
import { JWTConfig } from "../database/jwt.config";
import jwt from "jsonwebtoken";

export const JwtVerify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token === undefined) {
    return res.status(401).json({ message: "Missing Token" });
  }
  jwt.verify(token, JWTConfig.secret, (err, decode) => {
    if (err) {
      next(res.status(401).json({ error: "invalid token" }));
    }
    next();
  });
};
