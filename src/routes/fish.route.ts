import { Router } from "express";
import { getAllFishes } from "../modules/fish/fish.controller";

const fishRoute: Router = Router();

fishRoute.get("/", getAllFishes);

export default fishRoute;
