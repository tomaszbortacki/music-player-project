import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

export class Miniature extends Model {
  declare id_miniature: string;
  declare path: string;
}

Miniature.init(
  {
    id_miniature: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    path: DataTypes.STRING,
  },
  {
    tableName: "miniatures",
    sequelize,
  }
);
