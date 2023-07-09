/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { TmdbMovieDto } from '../dto/tmdb-movie.dto';
import { TmdbMovieToAppDto } from '../dto/tmdb-movie-to-app.dto';

@Injectable()
export class TmdbDomainService {
  isTmdbMovieDto(movie: any): boolean {
    return (
      movie instanceof Object &&
      'adult' in movie &&
      'backdrop_path' in movie &&
      'id' in movie &&
      'title' in movie &&
      'original_language' in movie &&
      'original_title' in movie &&
      'overview' in movie &&
      'poster_path' in movie &&
      'media_type' in movie &&
      'genre_ids' in movie &&
      'popularity' in movie &&
      'release_date' in movie &&
      'video' in movie &&
      'vote_average' in movie &&
      'vote_count' in movie
    );
  }

  get10MostPopular(movies: TmdbMovieDto[]): TmdbMovieDto[] {
    return movies.slice(0, 10);
  }

  formatToResponse(movies: TmdbMovieDto[]): TmdbMovieToAppDto[] {
    return movies.map((m) => {
      const {
        adult,
        original_language,
        overview,
        media_type,
        genre_ids,
        video,
        vote_average,
        vote_count,
        ...rest
      } = m;
      return rest;
    });
  }
}
