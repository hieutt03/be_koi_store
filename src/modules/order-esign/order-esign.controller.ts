import {NextFunction, Request, Response} from "express";
import {badRequest, created} from "../../utils/util";
import {OrderEsignService} from "./order-esign.service";
import {EsignStatus, Status} from "../../contants/enums";
import {OrderEsginRequestCreation} from "../../dto/order-esign/order-esign.request";
import sequelize from "../../config/db";
import User from "../../models/user.model";
import {OrderEsignCreationAttributes} from "../../models/order-esign.model";
import {FishService} from "../fish/fish.service";
import {PackageService} from "../package/package.service";


export const createOrderEsign = async (req: Request, res: Response, next: NextFunction) => {
    const t = await sequelize.transaction();
    try {
        const data = req.body as OrderEsginRequestCreation;
        const existingBuyer = await User.findOne({where: {userId: data.buyerId}});
        if (!existingBuyer) {
            badRequest(res, "User not found", data)
            return
        }

        if (!data.receiveDate || !data.expireDate) {
            badRequest(res, "Receive date and expire date is required", data)
            return
        }


        const dataOrder: OrderEsignCreationAttributes = {
            userId: data.buyerId,
            status: EsignStatus.Processing,
            receiveDate: data.receiveDate,
            expiryDate: data.expireDate,
        }

        const newOrderEsign = await OrderEsignService.createEsign(dataOrder, t)

        // let cost = 0;
        const fishList = data.fishes;
        const packageList = data.packages;

        if (fishList.length > 0) {
            for (let fish of fishList) {

                const newFish = await FishService.createFish({
                    ...fish,
                    price: fish.isNeedEstimated ? 0 : fish.price,
                    unique: true,
                    status: Status.PendingEsign
                }, t);

                await OrderEsignService.createEsignDetail({
                    fishId: newFish.fishId,
                    quantity: 1,
                    orderStatus: EsignStatus.Pending,
                    orderEsignId: newOrderEsign.orderEsignId
                }, t)

            }
        }

        if (packageList.length > 0) {
            for (let container of packageList) {
                const newFish = await FishService.createFish({
                    ...container,
                    price: container.isNeedEstimated ? 0 : container.price,
                    unique: true
                }, t);

                const newPackage = await PackageService.create({
                    fishId: newFish.fishId,
                    name: `Package ${container.initQuantity} ${newFish?.name}`,
                    quantity: container.initQuantity,
                    ownerId: data.buyerId,
                }, t)

                await OrderEsignService.createEsignDetail({
                    packageId: newPackage.packageId,
                    quantity: 1,
                    orderStatus: EsignStatus.Pending,
                    orderEsignId: newOrderEsign.orderEsignId
                }, t)
            }
        }

        await t.commit()
        created(res, "Create order success!");

    } catch (e) {
        await t.rollback()
        next(e);
    }
};

export const updateOrderEsgin = async (req: Request, res: Response, next: NextFunction) => {
    const t = await sequelize.transaction();
    try {

    } catch (e) {
        await t.rollback()
        next(e);
    }
}