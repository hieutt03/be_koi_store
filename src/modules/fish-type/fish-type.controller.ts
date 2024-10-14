import { NextFunction, Request, Response } from "express";
import { FishTypeService } from "./fish-type.service";
import { badRequest, created, ok } from "../../utils/util";

export const autoCreateFishType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const types = ["Purely imported", "F1 hybrid", "Pure Vietnamese"];
    for (const type of types) {
      await FishTypeService.create(type);
    }
    created(res, "Auto create OK!");
  } catch (e) {
    next(e);
  }
};

export const createFishType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { typeName } = req.body;
    if (typeName == null) {
      badRequest(res, "Type name is empty!");
      return
    }
    await FishTypeService.create(typeName);
    created(res, "Create success!");
  } catch (e) {
    next(e);
  }
};

export const getAllFishTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const types = await FishTypeService.getAll();
    ok(res, "Get all type success!", types);
  } catch (e) {
    next(e);
  }
};