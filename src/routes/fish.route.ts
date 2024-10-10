import { Router } from "express";
import { createFish, getAllFishes } from "../modules/fish/fish.controller";

const fishRoute: Router = Router();

fishRoute.get("/", getAllFishes);
fishRoute.post("/", createFish);

export default fishRoute;
