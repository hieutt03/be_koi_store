import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Fish from "./fish.model";
import User from "./user.model";
import PoolModel from "./pool.model";
import Pool from "./pool.model";

interface PackageAttributes {
  name: string;
  packageId: number;
  quantity: number;
  soldAt: Date;
  ownerId: number;
  poolId: number;
}

export interface PackageCreationAttributes extends Optional<PackageAttributes, "packageId"> {
}

class Package extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public name!: string;
  public packageId!: number;
  public quantity!: number;
  public soldAt!: Date;
  public ownerId!: number;
  public poolId!: number;
}

Package.init(
  {
    packageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    soldAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "userId"
      }
    },
    poolId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Pool,
        key: "poolId"
      }
    }
  },
  {
    tableName: "packages",
    sequelize
  }
);
Package.hasMany(Fish, { foreignKey: "packageId" });
Package.belongsTo(User, {
  foreignKey: "ownerId"
});
Package.belongsTo(Pool, { foreignKey: "poolId" });
export default Package;
