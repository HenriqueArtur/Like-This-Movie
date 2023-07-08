import { Injectable } from '@nestjs/common';
import { User } from '../user.model';

@Injectable()
export class InMemoryUserService {
  private users: User[] = [];

  createUser(email: string, password: string, id: string): User {
    const user: User = {
      id,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
