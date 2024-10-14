import { Router } from "express";
import {createVoucher, getAllVouchers} from "../modules/voucher/voucher.controller";

const voucherRoute: Router = Router();

voucherRoute.get("/", getAllVouchers);
voucherRoute.post("/", createVoucher);

export default voucherRoute;
