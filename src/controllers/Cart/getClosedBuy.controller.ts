import { Request, Response } from "express";
import GetClosedBuyService from "../../services/Cart/getClosedBuy.service";
import { getToken } from "../../utils/getToken.utils";

class GetClosedBuyController {
  async handle(req: Request, res: Response) {
    try {
      const getClosedBuyService = new GetClosedBuyService();
      const { id } = req.params;
      const headers = req.headers.authorization;

      if (!headers) {
        throw new Error("Missing Token");
      }

      const token = getToken(headers);

      const product = await getClosedBuyService.execute(token, id);


      return res.status(200).json({ data: product?.product });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default GetClosedBuyController;
