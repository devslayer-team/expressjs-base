import { UserModel } from "@/database/models/user.model";
import { User } from "@/models/user.model";

abstract class UserDatasource {
  abstract register(userModel: UserModel): Promise<string>;
  abstract find(email: string): Promise<User>;
  abstract login(userModel: UserModel): Promise<string>;
}

export default UserDatasource;
