import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import * as hapiCookie from "@hapi/cookie";
import { apiRoutes } from "./routes/index.js";
import createTables from "./models/entities/sync/index.js";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["Acess-Control-Allow-Origin"],
        credentials: true
      }
    }
  });

  await server.register([hapiCookie]);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PWD,
      isSecure: true, // false to dev client (postman, insomnia ...etc) and true to brownser utilization
      isHttpOnly: true,
      path: "/",
      isSameSite: "None"
    },
    redirectTo: false
  });

  server.auth.scheme("session", () => {
    return {
      authenticate: async (request, h) => {
        const session = request.state[process.env.COOKIE_NAME];

        if (!session || !session.isValid) {
          throw Boom.unauthorized("Invalid session");
        }

        return h.authenticated({ credentials: session });
      }
    };
  });

  server.auth.default("session");
  // routes
  server.route(apiRoutes);

  await server.start();
  console.log("Server running...", server.info.uri);

  // create tables, if necessary
  await createTables.sync();
};

init();
