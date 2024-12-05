import { store } from "../models/store.js";
import { userLoginSpec, userCreateSpec, userFindOneSpec } from "./schemas/user.schema.js";
import dotenv from "dotenv";
dotenv.config();

export const userController = {
  // Public route
  loginController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = userLoginSpec.validate(request.payload);
      if (validation.error)
        return h
          .response({
            error: true,
            code: "A001",
            message: validation.error.message
          })
          .code(400);
      // validation block =====================

      const { email, password } = request.payload;

      try {
        const response = await store.userStore.auth(email, password);
        if (response) {
          h.state(process.env.COOKIE_NAME, { iduser: response.id, email: response.email });
          const userData = await store.userStore.findOne(response.id);

          return h
            .response({
              error: false,
              data: userData
            })
            .state(process.env.COOKIE_NAME, { iduser: response.id, email: response.email })
            .code(200);
        } else {
          return h
            .response({
              error: true,
              code: "C001",
              message: "Incorrect data"
            })
            .code(401);
        }
      } catch (e) {
        return h
          .response({
            error: true,
            code: "F001",
            message: "An error occurred during authentication."
          })
          .code(500);
      }
    },
    auth: {
      mode: "try",
      strategy: "session"
    },
    plugins: {
      "hapi-auth-cookie": {
        redirectTo: false
      }
    }
  },

  // Private Route
  logoutController: {
    handler: async (request, h) => {
      try {
        h.unstate(process.env.COOKIE_NAME);
        return h.response({ message: "Logged out successfully" }).code(200);
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
  allUsersController: {
    handler: async (request, h) => {
      try {
        const data = await store.userStore.findAll();
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
    }
  },

  // Private Route
  oneUserController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = userFindOneSpec.validate(request.params.iduser);
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
        const user = await store.userStore.findOne(request.params.iduser);
        return h
          .response({
            error: false,
            message: "Success",
            user
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

  // Public Route
  createUserController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = userCreateSpec.validate(request.payload);
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
        await store.userStore.create(request.payload);
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
    },
    auth: false
  },

  // Private Route
  updateUserController: {
    handler: async (request, h) => {
      // validation block =====================
      const validation = userCreateSpec.validate(request.payload);
      const validationParams = userFindOneSpec.validate(request.params.iduser);
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
        await store.userStore.update(request.params.iduser, request.payload);
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
  destroyUserController: {
    handler: async (request, h) => {
      // validation block =====================
      const validationParams = userFindOneSpec.validate(request.params.iduser);
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
        await store.userStore.destroy(request.params.iduser);
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
