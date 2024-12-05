import * as Sequelize from "sequelize";
import sequelize from "../conn/db.js";
import opt from "../conn/options.js";

const db = sequelize;

const News = db.define(
  "news",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sub_title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    image: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  opt
);

export default News;
