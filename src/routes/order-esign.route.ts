import { Router } from "express";
import { createOrderEsign } from "../modules/order-esign/order-esign.controller";

const orderEsignRoute: Router = Router();

orderEsignRoute.post("/", createOrderEsign);

export default orderEsignRoute;
