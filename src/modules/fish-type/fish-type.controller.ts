import { NextFunction, Request, Response } from "express";
import { FishTypeService } from "./fish-type.service";
import ResponseDTO from "../../helpers/response";

export const autoCreateFishType = async (req: Request, res: Response, next: NextFunction) => {
  const types = ["Koi Nhật Bản", "Koi Tây Ban Nha", "Koi Hàn Quốc"];
  for (const type of types) {
    await FishTypeService.create(type);
  }
  res.status(201).json(ResponseDTO("Auto create OK!"));
};

export const createFishType = async (req: Request, res: Response, next: NextFunction) => {
  const { typeName } = req.body;
  if (typeName == null) {
    res.status(400).json(ResponseDTO("Type name is empty!", null, false));
    return;
  }
  await FishTypeService.create(typeName);
  res.status(201).json(ResponseDTO("Create success!"));
};

export const getAllFishTypes = async (req: Request, res: Response, next: NextFunction) => {
  const types = await FishTypeService.getAll();
  res.status(200).json(ResponseDTO("Get all type success!", types));
};