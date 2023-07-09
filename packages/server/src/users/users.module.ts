import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoSchema } from './interfaces/user-mongo.model';
import { UserMongoService } from './services/mongo-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserMongoSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [UserMongoService],
  exports: [UserMongoService],
})
export class UsersModule {}
