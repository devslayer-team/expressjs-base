import UserDatasource from "../datasource/abstract-datasources/user.datasources";
import { UserModel } from "../models/user.model";

class UserRepository {
  public userDatasource: UserDatasource;

  constructor(userDatasource: UserDatasource) {
    this.userDatasource = userDatasource;
  }

  public register = async (user: UserModel) => {
    return await this.userDatasource.register(user);
  };

  public find = async (email: string) => {
    return await this.userDatasource.find(email);
  };

  public login = async (user: UserModel) => {
    return await this.userDatasource.login(user);
  };

}

export default UserRepository;
