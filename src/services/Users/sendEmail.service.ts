import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../../repositories/user.repository";
import { transport } from "../mails/mailer";

class SendEmailService {
  async execute(userID: string, content: string, title: string, from: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { id: userID } });

    if (!user) {
      throw new Error("User not Exists");
    }

    const mailOptions = {
      from: `${from}@gmail.com`,
      to: user.email,
      subject: title, // Assunto
      template: "emailFromADM",
      context: { content: content },
    };

    transport.sendMail(mailOptions, function (err, info) {});
  }
}

export default SendEmailService;
