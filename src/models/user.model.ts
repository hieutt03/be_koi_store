import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { Role } from "../contants/enums";

interface UserAttributes {
  userId: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: Role;
  gender: boolean;
  address: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public active!: boolean;
  public role!: Role;
  public gender!: boolean;
  public address!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Role)),
      defaultValue: Role.Customer,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);
export default User;
