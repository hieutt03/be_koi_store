import { NextFunction, Request, Response } from "express";
import { FishService } from "./fish.service";
import ResponseDTO from "../../helpers/response";
import Fish, { FishCreationAttributes } from "../../models/fish.model";
import fishModel from "../../models/fish.model";

export const getAllFishes = async (req: Request, res: Response, next: NextFunction) => {
  const allFishes = await FishService.getAllFishes();
  res.status(200).json(ResponseDTO("Get all fishes success!", allFishes));
};

export const getFishById = async (req: Request, res: Response, next: NextFunction) => {
  const fish = await FishService.getFishByUserId(req.params.fishId);
  res.status(200).json(ResponseDTO("Get fish success!", fish));
};

export const createFish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fishData: FishCreationAttributes = req.body;
    await FishService.createFish(fishData);
    res.status(201).json(ResponseDTO("Create success!"));
  } catch (e) {
    next(e);
  }
};
