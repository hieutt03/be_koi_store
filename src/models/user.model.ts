import {DataTypes, Model, Optional, STRING} from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: "users",
        sequelize
    }
);
export default User;