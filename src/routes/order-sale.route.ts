import { Router } from "express";
import { getAllOrderSale } from "../modules/order-sale/order-sale.controller";

const orderSaleRoute: Router = Router();

orderSaleRoute.get("/", getAllOrderSale);

export default orderSaleRoute;
