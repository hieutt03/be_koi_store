import { Router } from "express";

import { autoCreateFishType, createFishType, getAllFishTypes } from "../modules/fish-type/fish-type.controller";

const fishTypeRoute: Router = Router();

fishTypeRoute.get("/", getAllFishTypes);
fishTypeRoute.get("/auto", autoCreateFishType);
fishTypeRoute.post("/", createFishType);


export default fishTypeRoute;
