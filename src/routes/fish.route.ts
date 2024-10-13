import { Router } from "express";
import { createFish, deleteFish, getAllFishes, getFishById, updateFish } from "../modules/fish/fish.controller";

const fishRoute: Router = Router();

fishRoute.get("/", getAllFishes);
fishRoute.post("/", createFish);
fishRoute.put("/:fishId", updateFish);
fishRoute.get("/:fishId", getFishById);
fishRoute.delete("/:fishId", deleteFish);

export default fishRoute;
