import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './models/movie.model';
import { MoviesMongoService } from './services/movies-mongo.service';
import { TmdbApiService } from './services/tmdb-api.service';
import { TmdbDomainService } from './services/tmdb-domain.service';
import { UsersLikesMongoService } from './services/users-likes-mongo.service';
import { UsersLikesSchema } from './models/users-likes.mode';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Movie',
        schema: MovieSchema,
      },
      {
        name: 'UserLike',
        schema: UsersLikesSchema,
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [
    MoviesMongoService,
    TmdbApiService,
    TmdbDomainService,
    UsersLikesMongoService,
  ],
})
export class MoviesModule {}
