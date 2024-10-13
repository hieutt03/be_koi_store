import OrderEsign, { OrderEsignCreationAttributes } from "../../models/order-esign.model";
import OrderEsignDetail, { OrderEsignDetailCreationAttributes } from "../../models/order-esign-detail.model";

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
  
  static async createEsignDetail(data: OrderEsignDetailCreationAttributes): Promise<OrderEsignDetail> {
    try {
      return await OrderEsignDetail.create(data);
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
  static async createEsign(data: OrderEsignCreationAttributes): Promise<OrderEsign> {
    try {
      return await OrderEsign.create(data);
    } catch (e: any) {
      throw Error(e.message || "Something went wrong.");
    }
  }
}