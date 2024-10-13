import sequelize from "sequelize";
import BadRequestException from "../../helpers/errors/bad-request.exception";
import OrderSale, { OrderSaleCreateAttributes } from "../../models/order-sale.model";
import User from "../../models/user.model";

export class OrderSaleService {
  static async getAllOrderSales() {
    return OrderSale.findAll();
  }

  static async createOrderSale(orderSale: any) {
    const { buyerId, staffId } = orderSale;

    const existingBuyer = await User.findOne({ where: { userId: buyerId } });
    if (!existingBuyer) {
      throw new BadRequestException("Buyer not found");
    }

    const existingStaff = await User.findOne({ where: { userId: staffId } });
    if (!existingStaff) {
      throw new BadRequestException("Staff not found");
    }

    // return OrderSale.create({ orderSaleId, paid, quantity, totalPrice, voucherCode, buyerId, staffId });
  }
}
