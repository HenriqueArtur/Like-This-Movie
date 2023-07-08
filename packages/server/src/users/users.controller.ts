import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(@Inject('UsersService') private userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
