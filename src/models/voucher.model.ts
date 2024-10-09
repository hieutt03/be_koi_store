import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface VoucherAttributes {
  name: string;
  voucherId: number,
  rate: number;
  code: string
}

interface VoucherCreationAttributes extends Optional<VoucherAttributes, "voucherId"> {
}

class Voucher extends Model<VoucherAttributes, VoucherCreationAttributes> implements VoucherAttributes {
  public name!: string;
  public voucherId!: number;
  public rate!: number;
  public code!: string;
}

Voucher.init({
  voucherId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  code: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: "vouchers",
  sequelize
});
export default Voucher;