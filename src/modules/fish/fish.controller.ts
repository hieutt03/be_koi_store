import { NextFunction, Request, Response } from "express";
import { FishService } from "./fish.service";
import ResponseDTO from "../../helpers/response";
import Fish, { FishCreationAttributes } from "../../models/fish.model";
import { badRequest, created, internalServerError, ok } from "../../utils/util";
import exp from "node:constants";

export const getAllFishes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allFishes = await FishService.getAllFishes();
    ok(res, "Get all Fishes", allFishes);
  } catch (e: any) {
    next(e);
  }
};

export const getFishById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fish = await FishService.getFishByFishId(req.params.fishId);
    ok(res, "Get fish success", fish);
  } catch (e: any) {
    next(e);
  }
};

export const createFish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fishData: FishCreationAttributes = req.body;
    const newFish = await FishService.createFish(fishData);
    created(res, "Created Fish",newFish);
  } catch (e) {
    next(e);
  }
};
export const updateFish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fishData = req.body;
    const fishId = req.params.fishId;
    const currentFish = await FishService.getFishByFishId(fishId);
    if (!currentFish) {
      badRequest(res, "Not found this fish");
      return;
    }
    const updateData: FishCreationAttributes = {
      ...currentFish,
      ...fishData
    };
    const isSuccess = await FishService.update(fishId,updateData);
    if (!isSuccess){
      internalServerError(res,"Update failed")
      return
    }
    ok(res, "Updated Fish");
  } catch (e) {
    next(e);
  }
};
export const deleteFish=async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fishId = req.params.fishId;
    const currentFish = await FishService.getFishByFishId(fishId);
    if (!currentFish) {
      badRequest(res, "Not found this fish");
      return;
    }
    await FishService.deleteFish(fishId);
    ok(res, "Deleted Fish");
  }catch (e) {
    next(e);
  }
}
