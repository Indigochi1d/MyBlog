const Router = require('koa-router');
const posts = require('./posts/index.js');

const api = new Router();

api.use('/posts', posts.routes());

module.exports = api;
