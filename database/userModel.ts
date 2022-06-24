import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

export class User extends Model {
  declare id_user: string;
  declare email: string;
  declare password: string;
  declare permission: number;
  declare firstname: string;
  declare lastname: string;
  declare birthday: string;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.INTEGER,
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);
