import { DataTypes, Model, Optional } from "sequelize";
import Fish from "./fish.model";
import sequelize from "../config/db";

interface DocumentAttributes {
  documentId: number;
  certificate: string;
  statusHealth: string;
  awards: string;
  fishId: number;
  
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, "documentId"> {
}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
  public documentId!: number;
  public certificate!: string;
  public statusHealth!: string;
  public awards!: string;
  public fishId!: number;
  
}

Document.init({
  documentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  certificate: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  statusHealth: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  awards: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  fishId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Fish,
      key: "fishId"
    }
  }
}, {
  tableName: "documents",
  sequelize
});

Document.belongsTo(Fish, { foreignKey: "fishId" });
Fish.hasOne(Document, { foreignKey: "fishId" });
export default Document;