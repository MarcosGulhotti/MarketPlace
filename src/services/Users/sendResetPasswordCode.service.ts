import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { transport } from "../mails/mailer";
import crypto from "crypto";

class SendResetPasswordCodeService {
  async execute(userID: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id: userID } });

    if (!user) {
      throw new Error("User not Exists");
    }

    const randomCode = crypto.randomBytes(20).toString("hex");

    const mailOptions = {
      from: `resetpassword@gmail.com`,
      to: user.email,
      subject: "Reset Password Code", // Assunto
      template: "recoverPassword",
      context: { content: randomCode },
    };
    transport.sendMail(mailOptions, function (err, info) {});

    let expires = new Date();
    expires.setHours(expires.getHours() + 1);

    user.resetPasswordCode = randomCode;
    user.resetPasswordExpires = expires;

    await usersRepository.save(user);

    return { message: "Code Send, valid for 1 hour" };
  }
}

export default SendResetPasswordCodeService;
