import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieModel } from '../models/movie.model';
import { Movie } from '../dto/movie.dto';

@Injectable()
export class MoviesMongoService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<MovieModel>,
  ) {}

  async findOrCreateByTmdbIds(tmdbIds: number[]): Promise<Movie[]> {
    const existingMovies = await this.movieModel.find({
      tmdb_id: { $in: tmdbIds },
    });
    const existingTmdbIds = existingMovies.map((movie) => movie.tmdb_id);
    const missingTmdbIdsPromise = tmdbIds
      .filter((tmdbId) => !existingTmdbIds.includes(tmdbId))
      .map((tmdb_id) =>
        new this.movieModel({
          tmdb_id,
          likes: 0,
        }).save(),
      );
    const newMovies = await Promise.all(missingTmdbIdsPromise);
    return [...existingMovies, ...newMovies].map((movieMongo) => ({
      id: movieMongo.id,
      tmdb_id: movieMongo.tmdb_id,
      likes: movieMongo.likes,
    }));
  }

  async updateLikes(
    id: string,
    operation: 'SUM' | 'SUBTRACT' = 'SUM',
  ): Promise<Movie> {
    const movieDoc = await this.movieModel.findById(id);
    movieDoc.likes = movieDoc.likes + (operation == 'SUM' ? 1 : -1);
    await movieDoc.save();
    return {
      id: movieDoc.id,
      likes: movieDoc.likes,
      tmdb_id: movieDoc.tmdb_id,
    };
  }
}
