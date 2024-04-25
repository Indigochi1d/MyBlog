import Router from "koa-router";
import posts from "./posts/index.js";

const api = new Router();

api.use("/posts.js", posts.routes());

export default api;
