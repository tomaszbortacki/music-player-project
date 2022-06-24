import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

export class Song extends Model {
  declare id_song: string;
  declare title: string;
  declare path: string;
}

Song.init(
  {
    id_song: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    path: DataTypes.STRING,
  },
  {
    tableName: "songs",
    sequelize,
  }
);
