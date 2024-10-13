import { Router } from "express";
import userRoutes from "./user.route";
import fishRoute from "./fish.route";
import orderSaleRoute from "./order-sale.route";
import documentRoute from "./document.route";
import voucherRoute from "./voucher.route";
import packageRoute from "./package.route";
import fishTypeRoute from "./fish-type.route";
import authRoutes from "./auth.route";
import poolRoute from "./pool.route";
import orderEsignRoute from "./order-esign.route";

const mainRoutes: Router = Router();

mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/users", userRoutes);
mainRoutes.use("/fishes", fishRoute);
mainRoutes.use("/fish-types", fishTypeRoute);
mainRoutes.use("/order-sales", orderSaleRoute);
mainRoutes.use("/order-esigns", orderEsignRoute);

mainRoutes.use("/documents", documentRoute);
mainRoutes.use("/vouchers", voucherRoute);
mainRoutes.use("/packages", packageRoute);
mainRoutes.use("/documents", documentRoute);
mainRoutes.use("/vouchers", voucherRoute);
mainRoutes.use("/packages", packageRoute);
mainRoutes.use("/pools", poolRoute);

export default mainRoutes;
