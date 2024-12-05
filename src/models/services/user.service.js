import User from "../entities/user.js";
import cripPass from "../../utils/cripPassword.js";
import comparePwd from "../../utils/comparePassword.js";
import News from "../entities/new.js";

export const userService = {
  auth: async (email, password) => {
    // try find user by email
    const userData = await User.findOne({
      where: {
        email: email
      }
    });

    // if user found
    if (userData) {
      // validate auth
      const validateAuth = await comparePwd(password, userData.password);
      if (!validateAuth) return false;
      return userData;
    } else {
      return false;
    }
  },

  create: async (user) => {
    try {
      const userExist = await User.findAll({
        where: {
          email: user.email
        }
      });

      if (userExist.length > 0) {
        throw new Error(`User ${user.email} already exists`);
      }
      // =====================
      else {
        const hash = await cripPass(user.password);
        const newData = {
          ...user,
          password: hash
        };
        await User.create(newData);
        return true;
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  },

  findAll: async () => {
    try {
      const response = await User.findAll();
      return response;
    } catch (e) {
      return e;
    }
  },

  findOne: async (id) => {
    try {
      const response = await User.findOne({
        where: {
          id: id
        }
      });
      return response;
    } catch (e) {
      return e;
    }
  },

  update: async (id, newData) => {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (newData.password) {
        const hash = await cripPass(newData.password);
        newData = {
          ...newData,
          password: hash
        };
      }
      await User.update(newData, {
        where: {
          id: id
        }
      });
      return true;
    } catch (e) {
      return e;
    }
  },

  destroy: async (id) => {
    try {
      // delete all news linkeds with id_user
      await News.destroy({
        where: {
          id_user: id
        }
      });

      // destroy user itself
      await User.destroy({
        where: {
          id: id
        }
      });
      return true;
    } catch (e) {
      return e;
    }
  }
};
