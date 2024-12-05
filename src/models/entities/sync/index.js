import sequelize from "../../conn/db.js";

const createTables = {
  sync: async () => {
    sequelize
      .sync({ force: false }) // if true, all tables will be droped and recreate. So, be careful with this option
      .then(() => {
        console.log("Tables have been created");
      })
      .catch((error) => {
        console.log("Unable to create tables", error);
      });
  }
};

export default createTables;
