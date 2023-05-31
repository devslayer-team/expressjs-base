import { User } from "@/models/user.model";
import {UserDataSource} from "../datasource/abstract-datasources/user-datasources";

class UserRepository {
  public userDatasource: UserDataSource;

  constructor(userDatasource: UserDataSource) {
    this.userDatasource = userDatasource;
  }
  public createUser  = async (user: User) => {
    return await this.userDatasource.createUser(user);
  }
  public getUserByEmail = async (email: string) => {
    return await this.userDatasource.getUserByEmail(email);
  };
  public getUserById = async (id: string) => {
    return await this.userDatasource.getUserById(id);
  };
}

export default UserRepository;
