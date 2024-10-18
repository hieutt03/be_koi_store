import OrderEsign, {OrderEsignCreationAttributes, OrderEsignFullAttributes} from "../../models/order-esign.model";
import OrderEsignDetail, {OrderEsignDetailCreationAttributes} from "../../models/order-esign-detail.model";
import {Transaction} from "sequelize";
import {EsignStatus, FishStatus, OrderStatus, Status} from "../../contants/enums";
import OrderSaleDetail from "../../models/order-sale-detail.model";
import OrderSale from "../../models/order-sale.model";
import Fish from "../../models/fish.model";
import {FishService} from "../fish/fish.service";

export class OrderEsignService {
    static async getAll(): Promise<OrderEsign[]> {
        try {
            return await OrderEsign.findAll({
                order: [
                    ["createdAt", "DESC"]
                ]
            });
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async getById(orderEsignId: number): Promise<OrderEsignFullAttributes | null> {
        try {
            return await OrderEsign.findByPk(orderEsignId,{
                include: [
                    {
                        model: OrderEsignDetail,
                        as: "orderDetails",
                        required: true
                    }
                ]
            })
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async createEsignDetail(data: OrderEsignDetailCreationAttributes, transaction?: Transaction): Promise<OrderEsignDetail> {
        try {
            return await OrderEsignDetail.create(data, {transaction});
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async createEsign(data: OrderEsignCreationAttributes, transaction?: Transaction): Promise<OrderEsign> {
        try {
            return await OrderEsign.create(data, {transaction});
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async updateOrderEsignStatus(orderEsignId: number, status: EsignStatus, transaction?: Transaction): Promise<boolean> {
        try {
            const [updateRows] = await OrderEsign.update({status}, {
                where: {
                    orderEsignId
                }, transaction
            });

            const orderDetails = await OrderEsignDetail.findAll({
                where: {
                    orderEsignId
                }, attributes: ['fishId'], transaction
            });

            for (let fish of orderDetails) {
                const currentFish = await FishService.getStatus(fish.fishId)
                if (currentFish && currentFish?.status !== Status.Esign) {
                    currentFish.status! = Status.Esign;
                    await currentFish.save();
                }
            }

            return updateRows > 0
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async updateStatusForTotalOrderEsignDetail(orderEsignId: number, status: EsignStatus, transaction: Transaction) {
        try {
            const [updateRows] = await OrderEsignDetail.update({
                orderStatus: status
            }, {
                where: {
                    orderEsignId
                }, transaction
            });
            return updateRows > 0;

        } catch (e: any) {
            new Error(e.message || "Something went wrong.");
        }
    }

    static async updateStatusForOnlyOrderEsignDetail(orderEsignDetailId: number, orderEsignId: number, status: EsignStatus, transaction?: Transaction) {
        try {
            const [updateRows] = await OrderEsignDetail.update({
                orderStatus: status
            }, {
                where: {
                    orderEsignDetailId
                },
                transaction
            });

            const fishOfOrderDetailUpdate = await OrderEsignDetail.findByPk(orderEsignDetailId, {attributes: ['fishId']})
           if (fishOfOrderDetailUpdate){
               const currentFish = await FishService.getStatus(fishOfOrderDetailUpdate?.fishId)
               if (currentFish && currentFish?.status !== Status.Esign) {
                   currentFish.status! = Status.Esign;
                   await currentFish.save();
               }
           }
            const orderDetails = await OrderEsignDetail.findAll({
                where: {orderEsignId},
                attributes: ['orderStatus', 'orderEsignId']
            })

            const isSameStatus = orderDetails.every(o => o.orderStatus === status)

            if (isSameStatus) {
                await OrderEsign.update(
                    {status},
                    {
                        where: {orderEsignId},
                        transaction
                    }
                );
            }
            return updateRows > 0;
        } catch
            (e: any) {
            new Error(e.message || "Something went wrong.");
        }
    }
}