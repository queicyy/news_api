import { store } from "../models/store.js";

export const sessionController = {
  // Private Route - all logged
  validation: {
    handler: async (request, h) => {
      const idUser = request.state[process.env.COOKIE_NAME]?.iduser;

      if (!idUser) {
        return h
          .response({
            error: true,
            code: "B001",
            message: "No user ID found in cookie"
          })
          .code(400);
      }

      try {
        const response = await store.userStore.findOne(idUser);
        return h
          .response({
            error: false,
            message: "Success",
            data: response
          })
          .code(200);
      } catch (e) {
        return h
          .response({
            error: true,
            code: "B002",
            message: "Access denied. User does not have the required permission."
          })
          .code(403);
      }
    }
  },
  pong: {
    handler: async (request, h) => {
      return h
        .response({
          error: false,
          message: "Success",
          data: "pong"
        })
        .code(200);
    }
  }
};
