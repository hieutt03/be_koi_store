import { Request, Response, NextFunction } from "express";
import { badRequest, created, ok } from "../../utils/util";
import { OrderEsignService } from "./order-esign.service";
import { EsignStatus, FishStatus } from "../../contants/enums";

interface EsignDataDetail {
  id: number,
  status: FishStatus
}

interface EsignData {
  fish: EsignDataDetail[],
  package: EsignDataDetail[],
}

export const createOrderEsign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, staffId, orderDate, expireDate, data } = req.body;
    
    if (!userId ||   !orderDate || !expireDate) {
      badRequest(res, "Please enter a valid information!");
      return;
    }
    
    if (data === null || data === undefined) {
      badRequest(res, "Please enter valid fishes!");
      return;
    }
    
    const orderEsign = await OrderEsignService.createEsign({
      userId,
      staffId,
      receiveDate: orderDate,
      expiryDate: expireDate,
      status: EsignStatus.Pending
    });
    
    const infoData = data as EsignData;
    
    const fishData = infoData.fish;
    const packageData = infoData.package;
    
    if (fishData !== null) {
      // for (let fish of fishData) {
      //   await OrderEsignService.createEsignDetail({
      //     fishId: fish.id,
      //     status: fish.status,
      //     orderEsignId: orderEsign.orderEsignId
      //   });
      // }
    }
    
    // if (packageData !== null) {
    //   for (let container of packageData) {
    //     await OrderEsignService.createEsignDetail({
    //       packageId: container.id,
    //       status: container.status,
    //       orderEsignId: orderEsign.orderEsignId
    //     });
    //   }
    // }
    
    created(res, "Create order success!");
    
  } catch (e) {
    next(e);
  }
};