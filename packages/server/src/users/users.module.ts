import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { InMemoryUserService } from './services/in-memory-user.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserService',
      useClass: InMemoryUserService,
    },
  ],
})
export class UsersModule {}
