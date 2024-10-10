import { Router } from "express";
import { createPool } from "../modules/pool/pool.controller";

const poolRoute: Router = Router();

// poolRoute.get("/", createPool);
poolRoute.post("/", createPool);

export default poolRoute;
