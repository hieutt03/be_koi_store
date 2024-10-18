import { Router } from "express";
import {createOrderEsign, getOrderEsgin} from "../modules/order-esign/order-esign.controller";

const orderEsignRoute: Router = Router();

orderEsignRoute.post("/", createOrderEsign);
orderEsignRoute.get("/:orderEsignId", getOrderEsgin)

export default orderEsignRoute;
