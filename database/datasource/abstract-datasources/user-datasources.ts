import { User } from "@/models/user.model";

export interface UserDataSource  {
    createUser(user: User): Promise<void>;
    getUserById(id: string ):  Promise<User|null> ;
    getUserByEmail(email: string ):  Promise<User|null> ;
}