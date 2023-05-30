import { UserModel } from "@/database/models/user.model";
import UserDatasource from "../abstract-datasources/user.datasources";
import MongoUserModel from "./models/user.model";
import { User } from "@/models/user.model";
import { createToken } from "@/utils";

export class UserDatasourceImpl implements UserDatasource {
  login(userModel: UserModel): Promise<string> {
    try {
      return new Promise<string>(async (resolve, reject) => {
        const { email, password } = userModel.user;
        const user = await MongoUserModel.findOne({ email });
        if (!user) {
          reject(new Error("User not found"));
        } else {
          if (await user.isValidPassword(password)) {
            resolve(createToken(user._id));
          } else {
            reject(Error("Wrong credentials given"));
          }
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  find(email: string): Promise<User> {
    try {
      return new Promise<User>(async (resolve, reject) => {
        const user = await MongoUserModel.findOne({ email });
        if (!user) reject(new Error("User not found"));
        const result = UserModel.fromJSON(user).user;
        resolve(result);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async register(userModel: UserModel): Promise<string> {
    try {
      const user = userModel.user;
      const userExist = await MongoUserModel.findOne({ email: user.email });
      if (userExist) throw new Error("Email exist");
      const newUser = new MongoUserModel({
        email: user.email,
        password: user.password,
        favorite: user.favorite,
        userAvatar: user.userAvatar,
      });
      const result = await newUser.save();
      return createToken(result._id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
