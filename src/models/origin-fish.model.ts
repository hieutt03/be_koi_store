import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface OriginFishAttributes {
  originFishId: number;
  originFishName: string;
}

interface OriginFishCreationAttributes extends Optional<OriginFishAttributes, "originFishId"> {}

class OriginFish extends Model<OriginFishAttributes, OriginFishCreationAttributes> implements OriginFishAttributes {
  public originFishId!: number;
  public originFishName!: string;
}

OriginFish.init(
  {
    originFishId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    originFishName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "origin-fishes",
    sequelize,
  }
);

export default OriginFish;
