import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.interface';
import { hash } from 'bcrypt';

export type UserDocument = HydratedDocument<Omit<User, 'id'>>;

@Schema()
export class UserMongo {
  @Prop()
  login: string;

  @Prop()
  password: string;
}

const UserMongoSchemaNotConfig = SchemaFactory.createForClass(UserMongo);

UserMongoSchemaNotConfig.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

export const UserMongoSchema = UserMongoSchemaNotConfig;
