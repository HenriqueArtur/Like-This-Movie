import { TmdbApiService } from '../../src/movies/services/tmdb-api.service';
import { TmdbDomainService } from '../../src/movies/services/tmdb-domain.service';

describe('trendingMovies', () => {
  const TmdbApi = new TmdbApiService();
  const TmdbDomain = new TmdbDomainService();
  it('should return an array of TmdbMovieDto objects', async () => {
    const movies = await TmdbApi.trendingMovies();
    expect(movies).toEqual(expect.any(Array));
    expect(TmdbDomain.isTmdbMovieDto(movies[0])).toBeTruthy();
  });
});
