import { Router } from "express";
import { getAllStaffs, getAllUsers, getStaffById, getUser, registerStaff } from "../modules/user/user.controller";
import { authMiddleware, isManager } from "../middleware/auth.middleware";

const userRoutes: Router = Router();

userRoutes.get("/", authMiddleware, getAllUsers);

userRoutes.post("/staffs", authMiddleware, isManager, registerStaff);
userRoutes.get("/staffs", authMiddleware, isManager, getAllStaffs);

userRoutes.get("/:userId", getUser);
userRoutes.get("/staffs/:staffId", authMiddleware, getStaffById);

export default userRoutes;
