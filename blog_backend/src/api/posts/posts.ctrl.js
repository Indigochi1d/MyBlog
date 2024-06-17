import Post from "../../models/post.js";
import mongoose from "mongoose";
import Joi from "joi";
import sanitizeOption, { removeHtmlAndShorten } from "./SanitizeOption.js";
import sanitizeHTML from "sanitize-html";

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (error) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};
/* 
  POST /api/posts
  {
    title : "제목",
    body : "내용",
    tags : ["tag1","tag2"]
  }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(), //required가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHTML(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  GET /api/posts?username=&tag=&page= 
*/
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    //예외처리
    ctx.status = 400;
    return;
  }
  const { tag, username } = ctx.query;
  //tag,username값이 유효하면 객체에 넣고 아니면 넣지 않음.
  const query = {
    ...(username ? { "user.username": username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

/*
  GET /api/posts/:id
 */
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};
/* 
  DELETE /api/posts/:id  
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndDelete(id).exec();
    ctx.status = 204; //No Contents
  } catch (error) {
    ctx.throw(500, error);
  }
};
/*
  PATCH /api/posts/:id
  {
    title : "수정",
    body : "수정내용",
    tags : ["수정","태그"]
  }
 */
export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHTML(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true, // 이 값이 true면 업데이트된 데이터를 반환함
      // false면 업데이트 되기 전 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
