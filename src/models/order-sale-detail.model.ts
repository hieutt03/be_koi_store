import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/db";
import Fish from "./fish.model";
import OrderSale from "./order-sale.model";
import Package from "./package.model";
import {FishOrderStatus} from "../contants/enums";


export interface OrderSaleDetailAttributes {
    orderSaleDetailId: number;
    orderSaleId: number;
    quantity: number;
    fishId: number;
    packageId: number
    initPrice: number
    status: FishOrderStatus;
}

export interface OrderSaleDetailCreationAttributes extends Optional<OrderSaleDetailAttributes, "orderSaleDetailId" | "packageId" | "fishId"> {
}

class OrderSaleDetail
    extends Model<OrderSaleDetailAttributes, OrderSaleDetailCreationAttributes>
    implements OrderSaleDetailAttributes {
    public orderSaleDetailId!: number;
    public orderSaleId!: number;
    public quantity!: number;
    public fishId!: number;
    public initPrice!: number
    public packageId!: number
    public status!: FishOrderStatus
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
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: Fish,
                key: "fishId",
            },
        },
        packageId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: Package,
                key: "packageId",
            },
        },
        orderSaleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: OrderSale,
                key: "orderSaleId"
            }
        },
        status: {
            type: DataTypes.ENUM(...Object.values(FishOrderStatus)),
            defaultValue: FishOrderStatus.Processing,
        },
        initPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "order-sale-details",
        sequelize,
    }
);
OrderSaleDetail.belongsTo(OrderSale, {foreignKey: "orderSaleId"});
OrderSale.hasMany(OrderSaleDetail, {foreignKey: "orderSaleId", as: "orderDetails"});

OrderSaleDetail.hasOne(Fish, {foreignKey: "fishId"});
Fish.belongsTo(OrderSaleDetail, {foreignKey: "fishId"});

OrderSaleDetail.hasOne(Package, {
    foreignKey: "packageId",
});
Package.belongsTo(OrderSaleDetail, {foreignKey: "packageId"});
export default OrderSaleDetail;
