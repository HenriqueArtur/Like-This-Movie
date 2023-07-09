import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { TmdbApiService } from './services/tmdb-api.service';
import { TmdbDomainService } from './services/tmdb-domain.service';
import { MoviesMongoService } from './services/movies-mongo.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersLikesMongoService } from './services/users-likes-mongo.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private tmdbApiService: TmdbApiService,
    private tmdbDomainService: TmdbDomainService,
    private moviesService: MoviesMongoService,
    private usersLikesService: UsersLikesMongoService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async fetchTop10(@Request() req: any) {
    const userId = req.user.id;
    const tmdBrTrendPage1 = await this.tmdbApiService.trendingMovies();
    const top10 = this.tmdbDomainService.get10MostPopular(tmdBrTrendPage1);
    const top10fieldsFormatted = this.tmdbDomainService.formatToResponse(top10);
    const idsToFetch = top10fieldsFormatted.map((m) => m.id);
    const [moviesLike, userLikes] = await Promise.all([
      this.moviesService.findOrCreateByTmdbIds(idsToFetch),
      this.usersLikesService.findBy(userId, idsToFetch),
    ]);
    const userLikesIds = userLikes.map((l) => l.tmdb_id);
    return top10fieldsFormatted.map((m) => {
      const movieInApp = moviesLike.find((ml) => ml.tmdb_id == m.id);
      return {
        ...m,
        tmdb_id: m.id,
        id: movieInApp.id,
        likes: movieInApp.likes,
        userLiked: !!userLikesIds.includes(movieInApp.tmdb_id),
      };
    });
  }
}
