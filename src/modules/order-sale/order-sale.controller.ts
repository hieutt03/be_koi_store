import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";
import { OrderSaleService } from "./order-sale.service";

export const getAllOrderSale = async (req: Request, res: Response, next: NextFunction) => {
  const allOrderSales = await OrderSaleService.getAllOrderSales();
  res.status(200).json(ResponseDTO("Get all OrderSale", allOrderSales));
};
