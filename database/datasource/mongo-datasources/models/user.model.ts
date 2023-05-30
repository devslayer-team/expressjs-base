import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Document } from "mongoose";

export interface UserDocument extends Document {
  isValidPassword(password: string): Promise<Error | boolean>;
}
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    favorite: {
      type: {
        charactersList: { type: Array },
        comicsList: { type: String },
      },
      required: false,
    },
    userAvatar: {
      type: {
        path: { type: String, required: true },
        extension: { type: String, required: true },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<UserDocument>("user", UserSchema);

export default UserModel;
