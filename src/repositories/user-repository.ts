import { User } from "../models";

class UserRepository {
  public findByEmail(email: string): Promise<User|null> {
    return User.findOne({
        where: { email }
    })
  }
}

export const userRepository = new UserRepository()