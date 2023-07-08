import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.interface';

export type UserDocument = HydratedDocument<Omit<User, 'id'>>;

@Schema()
export class UserMongo {
  @Prop()
  login: string;

  @Prop()
  password: string;
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongo);
