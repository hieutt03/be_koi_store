import { Router } from "express";
import { registerUser } from "../modules/auth/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/register-user", registerUser);

export default authRoutes;
