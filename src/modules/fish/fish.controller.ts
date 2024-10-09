import { NextFunction, Request, Response } from "express";
import { FishService } from "./fish.service";
import ResponseDTO from "../../helpers/response";

export const getAllFishes = async (req: Request, res: Response, next: NextFunction) => {
  const allFishes = await FishService.getAllFishes();
  res.status(200).json(ResponseDTO("Get all fishes", allFishes));
};
