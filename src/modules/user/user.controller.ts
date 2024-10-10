import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import ResponseDTO from "../../helpers/response";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await UserService.createUser(req, res, next);
  res.status(200).json(ResponseDTO("Register user successfully", newUser));
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const allUsers = await UserService.getAllUsers(req, res, next);
  res.status(200).json(ResponseDTO("Get all users hehe", allUsers));
};
