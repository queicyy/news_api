import { store } from "../models/store.js";
import { newsCreateSpec, newsFindOneSpec } from "./schemas/news.schema.js";

export const newsController = {
  // Public Route
  allNewsController: {
    handler: async (request, h) => {
      try {
        const data = await store.newsStore.findAll();
        return h
          .response({
            error: false,
            message: "Success",
            data
          })
          .code(200);
      } catch (e) {
        return h
          .response({
            error: true,
            code: "D001",
            message: e
          })
          .code(500);
      }
    },
    auth: false
  },

  // Public Route
  oneNewsController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = newsFindOneSpec.validate(request.params.idnews);
      if (validation.error)
        return h
          .response({
            error: true,
            code: "A001",
            message: validation.error.message
          })
          .code(400);
      // validation block =====================

      try {
        const data = await store.newsStore.findOne(request.params.idnews);
        return h
          .response({
            error: false,
            message: "Success",
            data
          })
          .code(200);
      } catch (e) {
        return h
          .response({
            error: true,
            code: "D001",
            message: e
          })
          .code(500);
      }
    },
    auth: false
  },

  // Private Route
  createNewsController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = newsCreateSpec.validate(request.payload);
      if (validation.error)
        return h
          .response({
            error: true,
            code: "A001",
            message: validation.error?.message
          })
          .code(400);
      // validation block =====================

      try {
        await store.newsStore.create(request.payload);
        return h
          .response({
            error: false,
            message: "Success"
          })
          .code(200);
      } catch (e) {
        if (e instanceof Error) {
          return h
            .response({
              error: true,
              code: "D001",
              message: e.message
            })
            .code(500);
        }
        return h
          .response({
            error: true,
            code: "D001",
            message: e
          })
          .code(500);
      }
    }
  },

  // Private Route
  updateNewsController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = newsCreateSpec.validate(request.payload);
      const validationParams = newsFindOneSpec.validate(request.params.idnews);
      if (validation.error || validationParams.error)
        return h
          .response({
            error: true,
            code: "A001",
            message: validation.error?.message ? validation.error?.message : validationParams.error?.message
          })
          .code(400);
      // validation block =====================

      try {
        await store.newsStore.update(request.params.idnews, request.payload);
        return h
          .response({
            error: false,
            message: "Success"
          })
          .code(200);
      } catch (e) {
        return h
          .response({
            error: true,
            code: "D001",
            message: e
          })
          .code(500);
      }
    }
  },

  // Private Route
  destroyNewsController: {
    handler: async (request, h) => {
      // validation block =====================
      const validationParams = newsFindOneSpec.validate(request.params.idnews);
      if (validationParams.error)
        return h
          .response({
            error: true,
            code: "A001",
            message: validationParams.error?.message
          })
          .code(400);
      // validation block =====================

      try {
        await store.newsStore.destroy(request.params.idnews);
        return h
          .response({
            error: false,
            message: "Success"
          })
          .code(200);
      } catch (e) {
        return h
          .response({
            error: true,
            code: "D001",
            message: e
          })
          .code(500);
      }
    }
  }
};
