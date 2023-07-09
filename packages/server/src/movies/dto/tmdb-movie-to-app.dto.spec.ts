import { faker } from '@faker-js/faker';
import { TmdbMovieToAppDto } from './tmdb-movie-to-app.dto';

describe('TmdbMovieToAppDto interface', () => {
  test('should have the required properties', () => {
    const tmdbMovieToAppDto: TmdbMovieToAppDto = {
      id: faker.number.int(),
      backdrop_path: faker.internet.url(),
      title: faker.company.name(),
      original_title: faker.company.name(),
      poster_path: faker.internet.url(),
    };

    expect(tmdbMovieToAppDto.id).toBeDefined();
    expect(tmdbMovieToAppDto.backdrop_path).toBeDefined();
    expect(tmdbMovieToAppDto.title).toBeDefined();
    expect(tmdbMovieToAppDto.original_title).toBeDefined();
    expect(tmdbMovieToAppDto.poster_path).toBeDefined();
  });
});
