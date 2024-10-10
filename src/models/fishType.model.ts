import { DataTypes, Model, Optional } from "sequelize";
import sequelize  from "../config/db";

interface FishTypeAttributes {
  fishTypeId: number,
  fishTypeName: string
}

interface FishTypeCreationAttributes extends Optional<FishTypeAttributes, "fishTypeId"> {
}

class FishType extends Model<FishTypeAttributes, FishTypeCreationAttributes> implements FishTypeAttributes {
  public fishTypeId!: number;
  public fishTypeName!: string;
}

FishType.init({
  fishTypeId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  fishTypeName: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}, {
  tableName: "fish-types",
  sequelize
});

export default FishType;