import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true or false
};
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};
/* 
  jwt.sign(parameter1 : 토큰안에 집어넣고 싶은 데이터, parameter2 : JWT 암호,parameter3 : 유효기)
 */
UserSchema.methods.generateToken = function(){
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',
    },
  );
  return token;
}
const User = mongoose.model("User", UserSchema);

export default User;
