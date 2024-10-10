import { NextFunction, Request, Response } from "express";
import { PoolCreationAttributes } from "../../models/pool.model";
import { badRequest, created, ok } from "../../utils/util";
import { PoolService } from "./pool.service";

export const createPool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as PoolCreationAttributes;
    if (data.name == null || data.code == null || data.type == null || data.description == null || data.speciesFish == null) {
      badRequest(res, "Please enter all required fields!");
      return;
    }
    await PoolService.create(data);
    created(res, "Create OK!");
  } catch (error) {
    next(error);
  }
  
};

export const getAllPools = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pools = await PoolService.getAllPools();
    ok(res, "Get all pools", pools);
  } catch (error) {
    next(error);
  }
  
};