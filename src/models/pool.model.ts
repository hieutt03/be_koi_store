import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { PoolType } from "../contants/enums";

interface PoolAttributes {
  poolId: number;
  maxQuantity: number;
  code: string;
  name: string;
  description: string;
  type: PoolType;
  initQuantity: number;
  remainQuantity: number;
  speciesFish: string;
  soldQuantity: number;
}

interface PoolCreationAttributes extends Optional<PoolAttributes, "poolId"> {}

class Pool extends Model<PoolAttributes, PoolCreationAttributes> implements PoolAttributes {
  public poolId!: number;
  public name!: string;
  public description!: string;
  public type!: PoolType;
  public initQuantity!: number;
  public remainQuantity!: number;
  public speciesFish!: string;
  public soldQuantity!: number;
  public maxQuantity!: number;
  public code!: string;
}

Pool.init(
  {
    poolId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PoolType)),
      allowNull: false,
    },
    initQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remainQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speciesFish: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    soldQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "pools",
    sequelize,
  }
);

export default Pool;
