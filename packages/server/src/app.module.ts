import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV == 'PROD' ? '.prod.env' : '.dev.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(`MONGO_CONNECTION`),
          ...(process.env.NODE_ENV == 'DEV'
            ? { dbName: configService.get<string>(`MONGO_DB_NAME`) }
            : {}),
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
