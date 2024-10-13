import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

interface OrderSaleAttributes {
  orderSaleId: number;
  paid: boolean;
  totalPrice: number;
  voucherCode: string;
  buyerId: number;
}

export interface OrderSaleCreateAttributes
  extends Optional<OrderSaleAttributes, "orderSaleId" | "voucherCode" | "totalPrice"> {}

class OrderSale extends Model<OrderSaleAttributes, OrderSaleCreateAttributes> implements OrderSaleAttributes {
  public orderSaleId!: number;
  public paid!: boolean;
  public totalPrice!: number;
  public voucherCode!: string;
  public buyerId!: number;
}

OrderSale.init(
  {
    orderSaleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    voucherCode: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    buyerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    tableName: "order-sales",
    sequelize,
  }
);

OrderSale.belongsTo(User, { foreignKey: "buyerId" });
User.hasMany(OrderSale, {
  foreignKey: "buyerId",
});
export default OrderSale;
