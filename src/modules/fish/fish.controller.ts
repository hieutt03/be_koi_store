import {NextFunction, Request, Response} from "express";
import {FishService} from "./fish.service";
import ResponseDTO from "../../helpers/response";
import Fish, {FishCreationAttributes} from "../../models/fish.model";
import {badRequest, created, internalServerError, ok} from "../../utils/util";
import exp from "node:constants";
import {PoolService} from "../pool/pool.service";
import fishModel from "../../models/fish.model";

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
        const fish = await FishService.getFishByFishId(Number(req.params.fishId));
        ok(res, "Get fish success", fish);
    } catch (e: any) {
        next(e);
    }
};

export const createFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fishData: FishCreationAttributes = req.body;

        const pool = await PoolService.getOrigin(fishData.poolId)
        const typePoolNeed = fishData.unique ? "specific" : "general"

        if (pool && (pool.origin !== fishData.origin || pool.type !== typePoolNeed)) {
            badRequest(res, "This fish cannot live in this pool")
            return
        }
        if (fishData.unique && (fishData.initQuantity !== 1)) {
            badRequest(res, "Specific fish is unique")
            return
        }

        const newFish = await FishService.createFish({...fishData, remainQuantity: fishData.initQuantity});
        created(res, "Created Fish", newFish);
    } catch (e) {
        next(e);
    }
};
export const updateFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fishData = req.body;
        const fishId = req.params.fishId;
        const currentFish = await FishService.getFishByFishId(Number(fishId));
        if (!currentFish) {
            badRequest(res, "Not found this fish");
            return;
        }
        const updateData: FishCreationAttributes = {
            ...currentFish,
            ...fishData
        };
        const isSuccess = await FishService.update(Number(fishId), updateData);
        if (!isSuccess) {
            internalServerError(res, "Update failed")
            return
        }
        ok(res, "Updated Fish");
    } catch (e) {
        next(e);
    }
};
export const deleteFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fishId = req.params.fishId;
        const currentFish = await FishService.getFishByFishId(Number(fishId));
        if (!currentFish) {
            badRequest(res, "Not found this fish");
            return;
        }
        await FishService.deleteFish(Number(fishId));
        ok(res, "Deleted Fish");
    } catch (e) {
        next(e);
    }
}
