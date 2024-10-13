import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Fish from "./fish.model";
import OrderSale from "./order-sale.model";
import Package from "./package.model";

interface OrderSaleDetailAttributes {
  orderSaleDetailId: number;
  orderSaleId: number;
  quantity: number;
  fishId: number;
}

interface OrderSaleDetailCreationAttributes extends Optional<OrderSaleDetailAttributes, "orderSaleDetailId"> {}

class OrderSaleDetail
  extends Model<OrderSaleDetailAttributes, OrderSaleDetailCreationAttributes>
  implements OrderSaleDetailAttributes
{
  public orderSaleDetailId!: number;
  public orderSaleId!: number;
  public quantity!: number;
  public fishId!: number;
}

OrderSaleDetail.init(
  {
    orderSaleDetailId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fish,
        key: "fishId",
      },
    },

    orderSaleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrderSale,
        key: "orderSaleId",
      },
    },
  },
  {
    tableName: "order-sale-details",
    sequelize,
  }
);
OrderSaleDetail.belongsTo(OrderSale, { foreignKey: "orderSaleId" });
OrderSale.hasMany(OrderSaleDetail, { foreignKey: "orderSaleId" });

OrderSaleDetail.hasOne(Fish, { foreignKey: "fishId" });
Fish.belongsTo(OrderSaleDetail, { foreignKey: "fishId" });

OrderSaleDetail.hasOne(Package, {
  foreignKey: "packageId",
});
Package.belongsTo(OrderSaleDetail, { foreignKey: "packageId" });
export default OrderSaleDetail;
