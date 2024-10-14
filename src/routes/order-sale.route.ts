import {Router} from "express";
import {
    createOrderSale,
    getAllOrderSale,
    getOrderDetailByOrderId,
    getOrdersByUserId
} from "../modules/order-sale/order-sale.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const orderSaleRoute: Router = Router();

orderSaleRoute.get("/", getAllOrderSale);
orderSaleRoute.post("/", authMiddleware, createOrderSale);
orderSaleRoute.get("/", authMiddleware, getOrdersByUserId);
orderSaleRoute.get("/:orderSaleId", authMiddleware, getOrderDetailByOrderId);

export default orderSaleRoute;
