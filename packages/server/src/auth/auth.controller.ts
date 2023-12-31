import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserMongoService } from 'src/users/services/mongo-user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserMongoService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() RegisterDTO: RegisterDto) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      id: user.id,
      login: user.login,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() UserDTO: LoginDto) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      id: user.id,
      login: user.login,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
