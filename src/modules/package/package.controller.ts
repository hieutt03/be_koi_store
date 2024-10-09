import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";
import { PackageService } from "./package.service";

export const getAllPackages = async (req: Request, res: Response, next: NextFunction) => {
  const allPackages = await PackageService.getAllPackages();
  res.status(200).json(ResponseDTO("Get all Packages", allPackages));
};
