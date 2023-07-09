import { Injectable } from '@nestjs/common';
import { TmdbMovieDto } from '../dto/tmdb-movie.dto';
import fetch from 'node-fetch';

@Injectable()
export class TmdbApiService {
  ROOT_URL = 'https://api.themoviedb.org/3';

  async trendingMovies(
    time_window: 'day' | 'week' = 'week',
    language = 'pt-BR',
  ) {
    const PATH = `trending/movie/${time_window}?language=${language}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };
    try {
      const response = await fetch(`${this.ROOT_URL}/${PATH}`, options);
      const { results } = await response.json();
      return results as TmdbMovieDto[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
