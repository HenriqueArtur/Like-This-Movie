import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMongo } from '../interfaces/user-mongo.model';
import { LoginDto } from 'src/auth/dto/login.dto';
import { compare } from 'bcrypt';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Injectable()
export class UserMongoService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserMongo>,
  ) {}

  async create(doc: CreateUserDto) {
    try {
      const result = await new this.userModel(doc).save();
      return {
        id: result.id,
        login: result.login,
      };
    } catch (error) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async findByLogin(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.userModel.findOne({ login });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await compare(password, user.password)) {
      return { id: user.id, login: user.login };
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: PayloadDto) {
    const { login } = payload;
    return await this.userModel.findOne({ login });
  }
}
