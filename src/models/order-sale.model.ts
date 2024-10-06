import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

interface OrderSaleAttributes {
  orderSaleId: number;
  paid: boolean,
  totalPrice: number,
  quantity: number,
  voucherCode: string,
  buyerId: number,
  orderAt: Date,
  staffId: number
}

interface OrderSaleCreateAttributes extends Optional<OrderSaleAttributes, "orderSaleId"> {
}

class OrderSale extends Model<OrderSaleAttributes, OrderSaleCreateAttributes> implements OrderSaleAttributes {
  public orderSaleId!: number;
  public paid!: boolean;
  public quantity!: number;
  public totalPrice!: number;
  public voucherCode!: string;
  public buyerId!: number;
  public orderAt!: Date;
  public staffId!: number;
}

OrderSale.init({
    orderSaleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    voucherCode: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    buyerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "userId"
      }
    },
    orderAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    staffId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "userId"
      }
    }
  },
  {
    tableName: "OrderSales",
    sequelize
  });

OrderSale.belongsTo(User, { foreignKey: "buyerId" });
OrderSale.belongsTo(User, { foreignKey: "staffId" });
User.hasMany(OrderSale, {
  foreignKey: "buyerId"
});
User.hasMany(OrderSale, {
  foreignKey: "staffId"
});

export default OrderSale;

