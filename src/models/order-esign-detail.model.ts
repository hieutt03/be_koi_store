import {FishStatus, OrderEsignDetailStatus} from "../contants/enums";
import {DataTypes, Model, Optional} from "sequelize";
import OrderEsign from "./order-esign.model";
import Fish from "./fish.model";
import Package from "./package.model";
import sequelize from "../config/db";
import exp from "node:constants";
import OrderSaleDetail from "./order-sale-detail.model";

interface OrderEsignDetailAttributes {
    orderEsignDetailId: number,
    fishId: number
    packageId: number
    status: FishStatus
    orderEsignId: number
    quantity: number,
    orderStatus: OrderEsignDetailStatus
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
    public orderStatus!: OrderEsignDetailStatus;
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
    },
    orderStatus: {
        type: DataTypes.ENUM(...Object.values(OrderEsignDetailStatus)),
        defaultValue: OrderEsignDetailStatus.Pending
    }
}, {
    sequelize, tableName: "order-esign-details"
});

OrderEsignDetail.belongsTo(OrderEsign, {foreignKey: "orderEsignId"});
OrderEsign.hasMany(OrderEsignDetail, {
    foreignKey: "orderEsignId"
});

OrderEsignDetail.hasOne(Fish, {foreignKey: "fishId"});
Fish.belongsTo(OrderEsignDetail, {foreignKey: "fishId"});

OrderEsignDetail.hasOne(Package, {
    foreignKey: "packageId",
});
Package.belongsTo(OrderEsignDetail, {foreignKey: "packageId"});
export default OrderEsignDetail;