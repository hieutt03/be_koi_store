import { NextFunction, Request, Response } from "express";

import { badRequest, created, ok } from "../../utils/util";
import {OriginFishService} from "./origin-fish.service";

export const autoCreateOriginFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = ["Japan", "Korea", "Russia"];
        for (const type of types) {
            await OriginFishService.create(type);
        }
        created(res, "Auto create OK!");
    } catch (e) {
        next(e);
    }
};

export const createOriginFish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { typeName } = req.body;
        if (typeName == null) {
            badRequest(res, "Type name is empty!");
            return
        }
        await OriginFishService.create(typeName);
        created(res, "Create success!");
    } catch (e) {
        next(e);
    }
};

export const getAllOriginFishs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const types = await OriginFishService.getAll();
        ok(res, "Get all type success!", types);
    } catch (e) {
        next(e);
    }
};