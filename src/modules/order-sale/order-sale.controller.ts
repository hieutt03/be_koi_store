import { NextFunction, Request, Response } from "express";
import { CreateOrderSaleRequest } from "../../dto/order-sale/order-sale.request";
import { created, ok } from "../../utils/util";
import { OrderSaleService } from "./order-sale.service";

export const getAllOrderSale = async (req: Request, res: Response, next: NextFunction) => {
  const allOrderSales = await OrderSaleService.getAllOrderSales();
  ok(res, "Get all OrderSale", allOrderSales);
};

export const createOrderSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrderSale = await OrderSaleService.createOrderSale(req.body as CreateOrderSaleRequest);
    created(res, "Created OrderSale", newOrderSale);
  } catch (e) {
    next(e);
  }
};
