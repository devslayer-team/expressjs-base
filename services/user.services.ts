import { UserDatasourceImpl } from "@/database/datasource/mongo-datasources/user.datasource";
import { UserModel } from "@/database/models/user.model";
import UserRepository from "@/database/repository/user.repository";
import { User } from "@/models/user.model";

export abstract class UserService {
  abstract register(
    email: string,
    password: string,
    userAvatar: object
  ): Promise<string>;
  abstract find(email: string): Promise<User>;
  abstract login(email: string, password: string): Promise<string>;
}

export class UserServiceImpl implements UserService {
  public repository: UserRepository;

  constructor() {
    this.repository = new UserRepository(new UserDatasourceImpl());
  }
  login(email: string, password: string): Promise<string> {
    try {
      return new Promise<string>(async (resolve) => {
        const user = UserModel.fromJSON({ email, password, favourite: {} });
        resolve(this.repository.login(user));
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  find(email: string): Promise<User> {
    try {
      return new Promise<User>(async (resolve) => {
        const user = this.repository.find(email);
        resolve(user);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  register(
    email: string,
    password: string,
    userAvatar: object
  ): Promise<string> {
    try {
      return new Promise<string>(async (resolve) => {
        const user = UserModel.fromJSON({
          email,
          password,
          userAvatar,
          favourite: {},
        });
        resolve(this.repository.register(user));
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
