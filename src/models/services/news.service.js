import News from "../entities/new.js";
import { User } from "../entities/associations/index.js";

export const newsService = {
  create: async (newData) => {
    try {
      await News.create(newData);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  },

  findAll: async () => {
    try {
      const response = await News.findAll({
        include: {
          model: User,
          required: true
        },
        order: [["createdAt", "ASC"]]
      });
      return response;
    } catch (e) {
      return e;
    }
  },

  findOne: async (id) => {
    try {
      const response = await News.findOne({
        include: {
          model: User,
          required: true
        },
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
      // normalize data
      newData = {
        title: newData.title,
        sub_title: newData.sub_title,
        id_user: newData.id_user,
        image: newData.image,
        text: newData.text
      };
      await News.update(newData, {
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
      await News.destroy({
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
