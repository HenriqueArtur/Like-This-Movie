import { faker } from '@faker-js/faker';
import { MovieApi } from './movie.model';

describe('MovieApi interface', () => {
  test('should have the required properties', () => {
    const movieApi: MovieApi = {
      id: faker.database.mongodbObjectId(),
      backdrop_path: faker.internet.url(),
      title: faker.company.name(),
      original_title: faker.company.name(),
      poster_path: faker.internet.url(),
      tmdb_id: faker.number.int(),
      likes: faker.number.int(100),
      userLiked: faker.datatype.boolean(),
    };

    expect(movieApi.id).toBeDefined();
    expect(movieApi.backdrop_path).toBeDefined();
    expect(movieApi.title).toBeDefined();
    expect(movieApi.original_title).toBeDefined();
    expect(movieApi.poster_path).toBeDefined();
  });
});
