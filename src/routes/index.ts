import { Router } from "express";
import userRoutes from "./user.route";
import fishRoute from "./fish.route";
import orderSaleRoute from "./order-sale.route";
import documentRoute from "./document.route";
import voucherRoute from "./voucher.route";
import packageRoute from "./package.route";
import authRoutes from "./auth.route";

const mainRoutes: Router = Router();

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/users", userRoutes);
mainRoutes.use("/fishes", fishRoute);
mainRoutes.use("/order-sales", orderSaleRoute);
mainRoutes.use("/documents", documentRoute);
mainRoutes.use("/vouchers", voucherRoute);
mainRoutes.use("/packages", packageRoute);

export default mainRoutes;
