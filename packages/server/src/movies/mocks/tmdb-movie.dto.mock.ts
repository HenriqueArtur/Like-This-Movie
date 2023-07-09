import { faker } from '@faker-js/faker';
import { TmdbMovieDto } from '../dto/tmdb-movie.dto';

export function TmdbMovieDtoMock(): TmdbMovieDto {
  return {
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
}
