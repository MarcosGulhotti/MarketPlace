import { Request, Response } from "express";
import SendEmailService from "../../services/Users/sendEmail.service";

class SendEmailController {
  async handle(req: Request, res: Response) {
    try {
      const { content, title, from, userID } = req.body;

      const sendEmailService = new SendEmailService();

      await sendEmailService.execute(userID, content, title, from);

      return res.status(200).json({ message: "Email Sent" });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default SendEmailController;
