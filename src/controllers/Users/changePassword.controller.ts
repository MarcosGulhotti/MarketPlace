import { Request, Response } from "express";
import ChangePasswordService from "../../services/Users/changePassword.service";
import { getToken } from "../../utils/getToken.utils";

class ChangePasswordController {
  async handle(req: Request, res: Response) {
    try {
      const { code, newPassword } = req.body;
      const headers = req.headers.authorization;

      const changePasswordService = new ChangePasswordService();

      if (!headers) {
        throw new Error("Missing Token");
      }

      const token = getToken(headers);

      const user = await changePasswordService.execute(
        token,
        code,
        newPassword
      );

      return res.status(200).json({ data: { newPassword: user.password } });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}
export default ChangePasswordController;
