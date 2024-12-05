import { userService } from "./services/user.service.js";
import { newsService } from "./services/news.service.js";

export const store = {
  userStore: userService,
  newsStore: newsService
};
