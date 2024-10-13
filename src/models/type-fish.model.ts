import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface TypeFishAttributes {
  typeFishId: number;
  typeFishName: string;
}

interface TypeFishCreationAttributes extends Optional<TypeFishAttributes, "typeFishId"> {}

class TypeFish extends Model<TypeFishAttributes, TypeFishCreationAttributes> implements TypeFishAttributes {
  public typeFishId!: number;
  public typeFishName!: string;
}

TypeFish.init(
  {
    typeFishId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    typeFishName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "fish-types",
    sequelize,
  }
);

export default TypeFish;
