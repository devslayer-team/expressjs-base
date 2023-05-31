import UserRepository from "@/database/repository/user.repository";
import { User } from "@/models/user.model";

export abstract class UserService {
 abstract createUser(user: User): Promise<void>;
 abstract getUserById(id: string ):  Promise<User|null> ;
 abstract getUserByEmail(email: string ):  Promise<User|null> ;
}

export class UserServiceImpl implements UserService {
  public repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }
  createUser(user: User): Promise<void> {
    return  this.repository.createUser(new User(user.email,user.password));
  }
  getUserById(id: string): Promise<User|null> {
    return  this.repository.getUserById(id);

  }
  getUserByEmail(email: string): Promise<User|null> {
    return this.repository.getUserByEmail(email);
  }
  
}
