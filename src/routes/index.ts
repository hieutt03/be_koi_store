import { Router } from "express";
import userRoutes from "./user.route";
import fishRoute from "./fish.route";
import orderSaleRoute from "./order-sale.route";
import documentRoute from "./document.route";
import voucherRoute from "./voucher.route";
import packageRoute from "./package.route";

const mainRoutes: Router = Router();

mainRoutes.use("/user", userRoutes);
mainRoutes.use("/fishes", fishRoute);
mainRoutes.use("/order-sale", orderSaleRoute);

mainRoutes.use("/document", documentRoute);
mainRoutes.use("/voucher", voucherRoute);
mainRoutes.use("/package", packageRoute);

export default mainRoutes;
