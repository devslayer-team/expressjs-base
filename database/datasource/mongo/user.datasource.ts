import UserModel from "@/database/datasource/mongo/models/user.model";
import {UserDataSource} from "../abstract-datasources/user-datasources";
import { User } from "@/models/user.model";

export class MongoUserDatasource implements UserDataSource {
  createUser(user: User): Promise<any>  {
   return  UserModel.create(user);
  }
  getUserById(id: string): Promise<User | null> {
   return  UserModel.findById(id);
  }
  getUserByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({email: email});
  }
}
