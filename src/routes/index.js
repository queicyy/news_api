import { userController } from "../controllers/user.controller.js";
import { newsController } from "../controllers/news.controller.js";
import { sessionController } from "../controllers/session.controller.js";

export const apiRoutes = [
  // ping
  {
    method: "GET",
    path: "/api/v1",
    config: sessionController.pong
  },
  // validation session
  {
    method: "GET",
    path: "/api/v1/session/uasdhuashejhrakjiasudfauebasd",
    config: sessionController.validation
  },

  // user route
  {
    method: "POST",
    path: "/api/v1/login",
    config: userController.loginController
  },
  {
    method: "POST",
    path: "/api/v1/logout",
    config: userController.logoutController
  },
  {
    method: "GET",
    path: "/api/v1/users",
    config: userController.allUsersController
  },
  {
    method: "GET",
    path: "/api/v1/users/{iduser}",
    config: userController.oneUserController
  },
  {
    method: "POST",
    path: "/api/v1/users-create",
    config: userController.createUserController
  },
  {
    method: "PUT",
    path: "/api/v1/users-update/{iduser}",
    config: userController.updateUserController
  },
  {
    method: "DELETE",
    path: "/api/v1/users-delete/{iduser}",
    config: userController.destroyUserController
  },

  // news route
  {
    method: "GET",
    path: "/api/v1/news",
    config: newsController.allNewsController
  },
  {
    method: "GET",
    path: "/api/v1/news/{idnews}",
    config: newsController.oneNewsController
  },
  {
    method: "POST",
    path: "/api/v1/news-create",
    config: newsController.createNewsController
  },
  {
    method: "PUT",
    path: "/api/v1/news-update/{idnews}",
    config: newsController.updateNewsController
  },
  {
    method: "DELETE",
    path: "/api/v1/news-delete/{idnews}",
    config: newsController.destroyNewsController
  }
];
