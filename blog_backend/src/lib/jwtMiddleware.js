import jwt from "jsonwebtoken";

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
        _id: decoded._id,
        username : decoded.username
    };
    console.log(decoded);   //토큰이 해석된 결과 출력
    return next();
  } catch (error) {
    return next();
  }
};

export default jwtMiddleware;
