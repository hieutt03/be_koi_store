import OrderSale from "../../models/order-sale.model";

export class OrderSaleService {
  static async getAllOrderSales() {
    return OrderSale.findAll();
  }
}
