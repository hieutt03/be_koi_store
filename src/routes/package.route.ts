import { Router } from "express";
import { createPackage, getAllPackages, updatePackage } from "../modules/package/package.controller";

const packageRoute: Router = Router();

packageRoute.get("/", getAllPackages);
packageRoute.post("/", createPackage);
packageRoute.put("/:packageId", updatePackage);

export default packageRoute;
