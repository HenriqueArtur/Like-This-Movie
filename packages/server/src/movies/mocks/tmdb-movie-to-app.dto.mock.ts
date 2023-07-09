import { faker } from '@faker-js/faker';
import { TmdbMovieToAppDto } from '../dto/tmdb-movie-to-app.dto';

export function TmdbMovieToAppDtoMock(): TmdbMovieToAppDto {
  return {
    id: faker.number.int(),
    backdrop_path: faker.internet.url(),
    title: faker.company.name(),
    original_title: faker.company.name(),
    poster_path: faker.internet.url(),
  };
}
