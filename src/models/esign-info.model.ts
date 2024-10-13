import { DataTypes, Model, Optional } from "sequelize";
import OrderEsignDetail from "./order-esign-detail.model";
import User from "./user.model";
import sequelize from "../config/db";

interface EsignInfoAttrbutes {
  esignInfoId: number,
  orderEsignDetailId: number,
  staffId: number,
  description: string,
  
}

export interface EsignInfoCreationAttributes extends Optional<EsignInfoAttrbutes, "esignInfoId"> {
}

class EsginInfo extends Model<EsignInfoAttrbutes, EsignInfoCreationAttributes> implements EsignInfoAttrbutes {
  public esignInfoId!: number;
  public orderEsignDetailId!: number;
  public staffId!: number;
  public description!: string;
}

EsginInfo.init({
  esignInfoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  orderEsignDetailId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: OrderEsignDetail,
      key: "orderEsignDetailId"
    }
  },
  staffId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: "userId"
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  tableName: "esign-infomations",
  sequelize
});
EsginInfo.belongsTo(OrderEsignDetail, {
  foreignKey: "orderEsignDetailId"
});
export default EsginInfo;