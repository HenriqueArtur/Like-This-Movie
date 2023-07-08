import { Injectable } from '@nestjs/common';
import { UserMongoService } from 'src/users/services/mongo-user.service';
import { sign } from 'jsonwebtoken';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserMongoService) {}

  async signPayload(payload: PayloadDto) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  }

  async validateUser(payload: PayloadDto) {
    return await this.userService.findByPayload(payload);
  }
}
