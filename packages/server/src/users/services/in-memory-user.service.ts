import { Injectable } from '@nestjs/common';
import { User } from '../user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemoryUserService implements UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = { id: randomUUID(), ...createUserDto };
    this.users.push(user);
    return user;
  }
}
