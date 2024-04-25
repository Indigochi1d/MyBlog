import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api/index.js';

dotenv.config();
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api/', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 8080;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
