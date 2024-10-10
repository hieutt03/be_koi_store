import { NextFunction, Request, Response } from "express";
import { ok } from "../../utils/util";
import { AuthService } from "./auth.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await AuthService.registerUser(req);
    ok(res, "Register user successfully", newUser);
  } catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
};
