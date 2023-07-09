import { TmdbMovieDto } from '../dto/tmdb-movie.dto';
import { TmdbMovieDtoMock } from '../mocks/tmdb-movie.dto.mock';
import { TmdbDomainService } from './tmdb-domain.service';

describe('TmdbDomainService', () => {
  const tmdbDomainService: TmdbDomainService = new TmdbDomainService();

  describe('isTmdbMovieDto', () => {
    it('should return true for a valid TmdbMovieDto', () => {
      const movie: TmdbMovieDto = TmdbMovieDtoMock();
      const result = tmdbDomainService.isTmdbMovieDto(movie);
      expect(result).toBe(true);
    });

    it('should return false for an invalid TmdbMovieDto', () => {
      const movie = {
        backdrop_path: '/backdrop.jpg',
        id: 12345,
        title: 'Movie Title',
      };
      const result = tmdbDomainService.isTmdbMovieDto(movie);
      expect(result).toBe(false);
    });
  });

  describe('get10MostPopular', () => {
    it('should return the first 10 movies from the input array', () => {
      const movies: TmdbMovieDto[] = [
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
      ];
      const result = tmdbDomainService.get10MostPopular(movies);
      expect(result).toHaveLength(10);
      expect(result).toEqual(movies.slice(0, 10));
    });

    it('should return an empty array if input array is empty', () => {
      const movies: TmdbMovieDto[] = [];
      const result = tmdbDomainService.get10MostPopular(movies);
      expect(result).toHaveLength(0);
    });

    it('should return the same array if input has less than 10 movies', () => {
      const movies: TmdbMovieDto[] = [
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
      ];

      const result = tmdbDomainService.get10MostPopular(movies);

      expect(result).toHaveLength(3);
      expect(result).toEqual(movies);
    });
  });

  describe('formatToResponse', () => {
    it('should return an array of TmdbMovieToAppDto objects', () => {
      const movies: TmdbMovieDto[] = [
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
      ];
      const result = tmdbDomainService.formatToResponse(movies);
      expect(result).toHaveLength(3);
      expect(result[0].id).toBeDefined();
      expect(result[0].backdrop_path).toBeDefined();
      expect(result[0].title).toBeDefined();
      expect(result[0].original_title).toBeDefined();
      expect(result[0].poster_path).toBeDefined();
    });

    it('should omit certain properties from each TmdbMovieDto', () => {
      const movies: TmdbMovieDto[] = [
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
        TmdbMovieDtoMock(),
      ];
      const result = tmdbDomainService.formatToResponse(movies);
      expect(result[0]).not.toHaveProperty('adult');
      expect(result[0]).not.toHaveProperty('original_language');
      expect(result[0]).not.toHaveProperty('overview');
      expect(result[0]).not.toHaveProperty('media_type');
      expect(result[0]).not.toHaveProperty('genre_ids');
      expect(result[0]).not.toHaveProperty('video');
      expect(result[0]).not.toHaveProperty('vote_average');
      expect(result[0]).not.toHaveProperty('vote_count');
    });
  });
});
