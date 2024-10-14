import OrderSale, {OrderSaleCreateAttributes, OrderSaleFullAttributes} from "../../models/order-sale.model";
import OrderSaleDetail, {OrderSaleDetailCreationAttributes} from "../../models/order-sale-detail.model";
import {or, Transaction} from "sequelize";

export class OrderSaleService {
    static async getAllOrderSales(): Promise<OrderSale[]> {
        try {
            return OrderSale.findAll();
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }

    }

    static async createOrderSale(data: OrderSaleCreateAttributes, transaction: Transaction) {
        try {
            return OrderSale.create(data, {transaction});
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }

    }

    static async createSaleDetail(data: OrderSaleDetailCreationAttributes, transaction: Transaction): Promise<OrderSaleDetail> {

        try {
            return await OrderSaleDetail.create(data, {transaction});
        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }
    }

    static async getAllOrderSalesByBuyer(buyerId: number): Promise<OrderSaleFullAttributes[]> {
        try {
            return await OrderSale.findAll({
                where: {buyerId},
                include: [
                    {
                        model: OrderSaleDetail,
                        as: "orderDetails",
                        required: true
                    }
                ]
            });

        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }

    }

    static async getAllOrderSalesByOrderId(buyerId: number, orderSaleId: number): Promise<OrderSaleFullAttributes[]> {
        try {
            return await OrderSale.findAll({
                where: {buyerId, orderSaleId},
                include: [
                    {
                        model: OrderSaleDetail,
                        as: "orderDetails",
                        required: true
                    }
                ]
            });

        } catch (e: any) {
            throw Error(e.message || "Something went wrong.");
        }

    }
}
