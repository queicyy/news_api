import * as Sequelize from "sequelize";
import sequelize from "../conn/db.js";
import opt from "../conn/options.js";

const db = sequelize;

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  opt
);

export default User;
