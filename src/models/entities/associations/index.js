import News from "../new.js";
import User from "../user.js";

// news
User.hasMany(News, { foreignKey: "id_user" });
News.belongsTo(User, { foreignKey: "id_user" });

export { User, News };
