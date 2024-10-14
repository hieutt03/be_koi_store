import {DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/db";

interface VoucherAttributes {
    name: string;
    voucherId: number,
    rate: number;
    code: string;
    description: string;
    initQuantity: number
    remainQuantity: number;
    startDate: Date
    endDate: Date
}

export interface VoucherCreationAttributes extends Optional<VoucherAttributes, "voucherId"> {
}

class Voucher extends Model<VoucherAttributes, VoucherCreationAttributes> implements VoucherAttributes {
    public name!: string;
    public voucherId!: number;
    public rate!: number;
    public code!: string;
    public description!: string;
    public initQuantity!: number;
    public remainQuantity!: number;
    public startDate!: Date
    public endDate!: Date
}

Voucher.init({
    voucherId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    rate: {
        type: DataTypes.FLOAT,
        defaultValue: 0.1
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    code: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    initQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remainQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: "vouchers",
    sequelize
});
export default Voucher;