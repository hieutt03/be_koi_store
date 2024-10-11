import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { PoolStatus, PoolType } from "../contants/enums";
import FishType from "./fishType.model";

interface PoolAttributes {
  poolId: number;
  maxQuantity: number;
  code: string;
  name: string;
  description: string;
  type: PoolType;
  initQuantity: number;
  remainQuantity: number;
  speciesFish: number;
  soldQuantity: number;
  status: PoolStatus;
}

export interface PoolCreationAttributes extends Optional<PoolAttributes, "poolId"> {
}

class Pool extends Model<PoolAttributes, PoolCreationAttributes> implements PoolAttributes {
  public poolId!: number;
  public name!: string;
  public description!: string;
  public type!: PoolType;
  public initQuantity!: number;
  public remainQuantity!: number;
  public speciesFish!: number;
  public soldQuantity!: number;
  public maxQuantity!: number;
  public code!: string;
  public status!: PoolStatus;
}

Pool.init(
  {
    poolId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PoolType)),
      allowNull: false
    },
    initQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    remainQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speciesFish: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: FishType,
        key: "fishTypeId"
      }
    },
    soldQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...Object.values(PoolStatus)),
      defaultValue: PoolStatus.Active
    }
  },
  {
    tableName: "pools",
    sequelize
  }
);

FishType.hasMany(Pool, { foreignKey: "speciesFish" });
Pool.belongsTo(FishType, { foreignKey: "speciesFish" });

export default Pool;
