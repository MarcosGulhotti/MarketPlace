import { Request, Response } from "express";
import BuyProductsService from "../../services/Cart/buyProducts.service";
import { transport } from "../../services/mails/mailer";
import { getToken } from "../../utils/getToken.utils";

class BuyProductsController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;
      const buyProductsService = new BuyProductsService();

      if (!headers) {
        throw new Error("Missing Token");
      }
      const userToken = getToken(headers);

      const data = await buyProductsService.execute(userToken);
      const finalBuy = data.output;
      const total = data.total;
      if (finalBuy.length === 0) {
        return res.status(200).json({ message: "No item in cart" });
      }

      const mailOptions = {
        from: "Marcos",
        to: userToken.email,
        subject: "Compra Realizada", // Assunto
        template: "completePurchase",
        context: {
          name: userToken.name,
          products: finalBuy,
          total: total,
        },
      };
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      return res.status(200).json({ data: finalBuy, total: total });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}
export default BuyProductsController;
