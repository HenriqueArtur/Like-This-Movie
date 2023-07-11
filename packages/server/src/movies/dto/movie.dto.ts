import { TmdbMovieDto } from './tmdb-movie.dto';

export class Movie {
  id: string;
  tmdb_id: number;
  likes: number;
  tmdb_obj: TmdbMovieDto;
}
