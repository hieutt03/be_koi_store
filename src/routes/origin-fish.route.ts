import {Router} from "express";

import {autoCreateOriginFish, createOriginFish, getAllOriginFishs} from "../modules/origin-fish/origin-fish.controller";

const originFish: Router = Router();

originFish.get("/", getAllOriginFishs);
originFish.get("/auto", autoCreateOriginFish);
originFish.post("/", createOriginFish);


export default originFish;
