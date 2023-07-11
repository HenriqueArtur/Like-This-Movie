import {
  Controller,
  Get,
  UseGuards,
  Response,
  Request,
  Post,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { TmdbApiService } from './services/tmdb-api.service';
import { TmdbDomainService } from './services/tmdb-domain.service';
import { MoviesMongoService } from './services/movies-mongo.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersLikesMongoService } from './services/users-likes-mongo.service';
import { Response as Res } from 'express';
import { Movie } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private tmdbApiService: TmdbApiService,
    private tmdbDomainService: TmdbDomainService,
    private moviesService: MoviesMongoService,
    private usersLikesService: UsersLikesMongoService,
  ) {}

  @Get('/most-trended')
  async mostTrended() {
    const tmdBrTrendPage1 = await this.tmdbApiService.trendingMovies();
    const [mostTrended] =
      this.tmdbDomainService.get10MostPopular(tmdBrTrendPage1);
    return mostTrended;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async fetchTop10(@Request() req: any) {
    const userId = req.user.id;
    const tmdBrTrendPage1 = await this.tmdbApiService.trendingMovies();
    const top10 = this.tmdbDomainService.get10MostPopular(tmdBrTrendPage1);
    const top10fieldsFormatted = this.tmdbDomainService.formatToResponse(top10);
    const idsToFetch = top10fieldsFormatted.map((m) => m.id);
    const [moviesLike, userLikes] = await Promise.all([
      this.moviesService.findOrCreateByTmdbIds(top10),
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/most-liked')
  async fetchTop10MostLiked(@Request() req: any): Promise<Movie[]> {
    const userId = req.user.id;
    const movies = await this.moviesService.fetchTop10ByLikes();
    const userLikes = await this.usersLikesService.findBy(
      userId,
      movies.map((m) => m.tmdb_id),
    );
    const userLikesIds = userLikes.map((l) => l.tmdb_id);
    return movies.map((m) => {
      return {
        ...m,
        userLiked: !!userLikesIds.includes(m.tmdb_id),
      };
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/toggle-like/:tmdb_id')
  async toggleLike(
    @Request() req: any,
    @Response() res: Res,
    @Param('tmdb_id') tmdb_id: number,
  ) {
    const userId = req.user.id;
    const like = await this.usersLikesService.findByTmdbId(userId, tmdb_id);
    if (!like) {
      const newLike = await this.usersLikesService.create(userId, tmdb_id);
      await this.moviesService.updateLikes(tmdb_id);
      return res.status(HttpStatus.CREATED).send(newLike);
    }
    await this.usersLikesService.deleteByTmdbId(tmdb_id);
    await this.moviesService.updateLikes(tmdb_id, 'SUBTRACT');
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
