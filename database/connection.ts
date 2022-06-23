import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@db/${process.env.PG_DATABASE}`
);

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
