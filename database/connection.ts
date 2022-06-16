import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@db/${process.env.PG_DATABASE}`
);

export const User = sequelize.define(
  "user",
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
    schema: "public",
  }
);
