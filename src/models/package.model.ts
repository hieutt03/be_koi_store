import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Fish from "./fish.model";
import User from "./user.model";

interface PackageAttributes {
  name: string;
  packageId: number;
  quantity: number;
  soldAt: Date;
  ownerId: string;
}

interface PackageCreationAttributes extends Optional<PackageAttributes, "packageId"> {}

class Package extends Model<PackageAttributes, PackageCreationAttributes> implements PackageAttributes {
  public name!: string;
  public packageId!: number;
  public quantity!: number;
  public soldAt!: Date;
  public ownerId!: string;
}

Package.init(
  {
    packageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    soldAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    tableName: "Packages",
    sequelize,
  }
);

Package.hasMany(Fish, { foreignKey: "packageId" });
Package.hasOne(User, {
  foreignKey: "ownerId",
});
export default Package;
