import { Router } from "express";
import { createUser, getAllUsers } from "../modules/user/user.controller";

const userRoutes: Router = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/", createUser);

export default userRoutes;
