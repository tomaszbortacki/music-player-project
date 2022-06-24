import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@db/${process.env.PG_DATABASE}`
);
