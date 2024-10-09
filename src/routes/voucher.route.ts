import { Router } from "express";
import { getAllOrderSale } from "../modules/order-sale/order-sale.controller";
import { getAllVouchers } from "../modules/voucher/voucher.controller";

const voucherRoute: Router = Router();

voucherRoute.get("/", getAllVouchers);

export default voucherRoute;
