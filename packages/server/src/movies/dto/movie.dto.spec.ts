import { faker } from '@faker-js/faker';
import { Movie } from './movie.dto';

describe('Movie interface', () => {
  test('should have the required properties', () => {
    const movie: Movie = {
      id: faker.database.mongodbObjectId(),
      tmdb_id: faker.number.int(),
      likes: faker.number.int(),
      tmdb_obj: {
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
      },
    };

    expect(movie.id).toBeDefined();
    expect(movie.tmdb_id).toBeDefined();
    expect(movie.likes).toBeDefined();
    expect(movie.tmdb_obj.id).toBeDefined();
    expect(movie.tmdb_obj.backdrop_path).toBeDefined();
    expect(movie.tmdb_obj.title).toBeDefined();
    expect(movie.tmdb_obj.original_title).toBeDefined();
    expect(movie.tmdb_obj.poster_path).toBeDefined();
    expect(movie.tmdb_obj.adult).toBeDefined();
    expect(movie.tmdb_obj.original_language).toBeDefined();
    expect(movie.tmdb_obj.overview).toBeDefined();
    expect(movie.tmdb_obj.media_type).toBeDefined();
    expect(movie.tmdb_obj.genre_ids).toBeDefined();
    expect(movie.tmdb_obj.popularity).toBeDefined();
    expect(movie.tmdb_obj.release_date).toBeDefined();
    expect(movie.tmdb_obj.video).toBeDefined();
    expect(movie.tmdb_obj.vote_average).toBeDefined();
    expect(movie.tmdb_obj.vote_count).toBeDefined();
  });
});
