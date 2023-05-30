import { User } from "@/models/user.model";

export class UserModel {
  public user: User;

  constructor(user: User) {
    this.user = user;
  }

  toJSON(): any {
    const { id, email, password, favorite } = this.user;
    return { id, email, password, favorite };
  }

  static fromJSON(json: any): UserModel {
    const userDocument: User = json as User;
    return new UserModel(userDocument);
  }
}
