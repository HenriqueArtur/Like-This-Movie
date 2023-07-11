import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieModel } from '../models/movie.model';
import { Movie } from '../dto/movie.dto';
import { TmdbMovieDto } from '../dto/tmdb-movie.dto';

@Injectable()
export class MoviesMongoService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<MovieModel>,
  ) {}

  async findOrCreateByTmdbIds(tmdbMovies: TmdbMovieDto[]): Promise<Movie[]> {
    const tmdbIds = tmdbMovies.map((m) => m.id);
    const existingMovies = await this.movieModel.find({
      tmdb_id: { $in: tmdbIds },
    });
    const existingTmdbIds = existingMovies.map((movie) => movie.tmdb_id);
    const missingTmdbIdsPromise = tmdbIds
      .filter((tmdbId) => !existingTmdbIds.includes(tmdbId))
      .map((tmdb_id) =>
        this.movieModel.create({
          tmdb_id,
          likes: 0,
          tmdb_obj: tmdbMovies.find((m) => m.id == tmdb_id),
        }),
      );
    const newMovies = await Promise.all(missingTmdbIdsPromise);
    return [...existingMovies, ...newMovies].map((movieMongo) => ({
      id: movieMongo.id,
      tmdb_id: movieMongo.tmdb_id,
      likes: movieMongo.likes,
      tmdb_obj: movieMongo.tmdb_obj,
    }));
  }

  async updateLikes(
    tmdbId: number,
    operation: 'SUM' | 'SUBTRACT' = 'SUM',
  ): Promise<Movie> {
    const movieDoc = await this.movieModel.findOne({ tmdb_id: tmdbId });
    movieDoc.likes = movieDoc.likes + (operation == 'SUM' ? 1 : -1);
    await movieDoc.save();
    return {
      id: movieDoc.id,
      likes: movieDoc.likes,
      tmdb_id: movieDoc.tmdb_id,
      tmdb_obj: movieDoc.tmdb_obj,
    };
  }

  async fetchTop10ByLikes(): Promise<Movie[]> {
    const movies = await this.movieModel
      .find({})
      .sort({ likes: -1, 'tmdb_obj.popularity': -1 })
      .limit(10);
    return movies.map((movieMongo) => ({
      id: movieMongo.id,
      tmdb_id: movieMongo.tmdb_id,
      likes: movieMongo.likes,
      tmdb_obj: movieMongo.tmdb_obj,
    }));
  }
}
