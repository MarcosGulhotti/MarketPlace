import { Request, Response } from "express";
import SendResetPasswordCodeService from "../../services/Users/sendResetPasswordCode.service";
import { getToken } from "../../utils/getToken.utils";

class SendResetPasswordCodeController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;

      const sendResestPasswordCodeService = new SendResetPasswordCodeService();

      if (!headers) {
        throw new Error("Missing Token");
      }

      const token = getToken(headers);

      const sendCode = await sendResestPasswordCodeService.execute(token.id);

      return res.status(200).json({ message: sendCode });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default SendResetPasswordCodeController;
