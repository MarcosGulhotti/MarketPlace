import { Request, Response } from "express";
import GetAllClosedPurchasesService from "../../services/Cart/getAllClosedPurchases.service";
import ListAllCartsService from "../../services/Cart/listAllCarts.service";

class ListAllClosedPurchasesController {
  async handle(req: Request, res: Response) {
    try {
      const getAllClosedPurchasesService = new GetAllClosedPurchasesService();

      const data = await getAllClosedPurchasesService.execute();

      res.status(200).json({
        data: data,
      });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListAllClosedPurchasesController;
