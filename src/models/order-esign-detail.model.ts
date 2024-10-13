import { FishStatus } from "../contants/enums";
import { DataTypes, Model, Optional } from "sequelize";
import OrderEsign from "./order-esign.model";
import Fish from "./fish.model";
import Package from "./package.model";
import sequelize from "../config/db";
import exp from "node:constants";

interface OrderEsignDetailAttributes {
  orderEsignDetailId: number,
  fishId: number
  packageId: number
  status: FishStatus
  orderEsignId: number
  quantity: number
}

export interface OrderEsignDetailCreationAttributes extends Optional<OrderEsignDetailAttributes, "orderEsignDetailId" | "packageId" | "fishId"> {

}

class OrderEsignDetail extends Model<OrderEsignDetailAttributes, OrderEsignDetailCreationAttributes> implements OrderEsignDetailAttributes {
  public orderEsignDetailId!: number;
  public fishId!: number;
  public packageId!: number;
  public status!: FishStatus;
  public orderEsignId!: number;
  public quantity!: number;
}

OrderEsignDetail.init({
  orderEsignDetailId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  fishId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Fish,
      key: "fishId"
    }
  },
  packageId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Package,
      key: "packageId"
    }
  },
  status: {
    type: DataTypes.ENUM(...Object.values(FishStatus)),
    defaultValue: FishStatus.Healthy
  },
  orderEsignId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: OrderEsign,
      key: "orderEsignId"
    }
  }
  , quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize, tableName: "order-esign-details"
});
OrderEsignDetail.belongsTo(OrderEsign, { foreignKey: "orderEsignId" });
OrderEsign.hasMany(OrderEsignDetail, {
  foreignKey: "orderEsignId"
});
export default OrderEsignDetail;