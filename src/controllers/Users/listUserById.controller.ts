import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { CartRepository } from "../../repositories/cart.repository";
import ListUserByIdService from "../../services/Users/listUserById.service";
import { IUserProps } from "../../types/user.types";
import { getToken } from "../../utils/getToken.utils";

class ListUserController {
  async handle(req: Request, res: Response) {
    try {
      const headers = req.headers.authorization;
      const { id } = req.params;
      const listUserService = new ListUserByIdService();
      const cartRepository = getCustomRepository(CartRepository);

      if (!headers) {
        return res.status(401).json({ message: "Missing Authorization Token" });
      }

      const token: IUserProps = getToken(headers);

      const user = await listUserService.execute({ id, token });
      const cart = await cartRepository.findOne({ where: { owner: user.id } });

      res.status(200).json({
        user: user.serialize(),
        cart: {
          id: cart?.id,
        },
      });
    } catch (error) {
      return res.status(400).json({ message: (error as any).message });
    }
  }
}

export default ListUserController;
