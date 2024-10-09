import { Router } from "express";
import { getAllPackages } from "../modules/package/package.controller";

const packageRoute: Router = Router();

packageRoute.get("/", getAllPackages);

export default packageRoute;
