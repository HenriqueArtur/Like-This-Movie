import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.model';

export interface UsersService {
  create: (createUserDto: CreateUserDto) => Promise<User>;
}
