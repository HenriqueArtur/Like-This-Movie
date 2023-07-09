import { faker } from '@faker-js/faker';
import { TmdbMovieDto } from './tmdb-movie.dto';

describe('TmdbMovieDto interface', () => {
  test('should have the required properties', () => {
    const tmdbMovieDto: TmdbMovieDto = {
      id: faker.number.int(),
      backdrop_path: faker.internet.url(),
      title: faker.company.name(),
      original_title: faker.company.name(),
      poster_path: faker.internet.url(),
      adult: faker.datatype.boolean(),
      original_language: 'pt-BR',
      overview: faker.lorem.lines(1),
      media_type: 'movie',
      genre_ids: [faker.number.int()],
      popularity: faker.number.int(),
      release_date: '2023-06-06',
      video: false,
      vote_average: faker.number.int(),
      vote_count: faker.number.int(),
    };

    expect(tmdbMovieDto.id).toBeDefined();
    expect(tmdbMovieDto.backdrop_path).toBeDefined();
    expect(tmdbMovieDto.title).toBeDefined();
    expect(tmdbMovieDto.original_title).toBeDefined();
    expect(tmdbMovieDto.poster_path).toBeDefined();
  });
});
