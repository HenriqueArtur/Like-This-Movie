import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMongo } from '../interfaces/user-mongo.model';

@Injectable()
export class UserMongoService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserMongo>,
  ) {}

  async create(doc: CreateUserDto) {
    const result = await new this.userModel(doc).save();
    return {
      id: result.id,
      login: result.login,
      password: result.password,
    };
  }
}