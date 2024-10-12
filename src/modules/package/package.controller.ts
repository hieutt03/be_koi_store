import { NextFunction, Request, Response } from "express";
import ResponseDTO from "../../helpers/response";
import { PackageService } from "./package.service";
import { PackageCreationAttributes } from "../../models/package.model";
import { badRequest, internalServerError, ok } from "../../utils/util";


export const getAllPackages = async (req: Request, res: Response, next: NextFunction) => {
  const allPackages = await PackageService.getAllPackages();
  res.status(200).json(ResponseDTO("Get all Packages", allPackages));
};
export const createPackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as PackageCreationAttributes;
    if (!data.name || !data.ownerId || !data.soldAt || !data.quantity) {
      badRequest(res, "Enter all required fields");
      return;
    }
    const newPackage = await PackageService.create(data);
    ok(res, "Created Ok!", newPackage);
  } catch (error) {
    next(error);
  }
};
export const updatePackage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const packageId = req.params.packageId;
    const currentPackage = await PackageService.getPackageByPackageId(packageId);
    if (!currentPackage) {
      badRequest(res, "Not found this package");
      return;
    }
    const data = req.body as PackageCreationAttributes;
    const updateData: PackageCreationAttributes = {
      ...currentPackage,
      ...data
    };
    
    const isSuccess = await PackageService.update(packageId, updateData);
    if (!isSuccess) {
      internalServerError(res, "Update failed");
      return;
    }
    ok(res, "Updated package");
  } catch (error) {
    next(error);
  }
};
