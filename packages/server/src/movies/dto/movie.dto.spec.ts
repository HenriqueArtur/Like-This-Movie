import { faker } from '@faker-js/faker';
import { Movie } from './movie.dto';

describe('Movie interface', () => {
  test('should have the required properties', () => {
    const movie: Movie = {
      id: faker.database.mongodbObjectId(),
      tmdb_id: faker.number.int(),
      likes: faker.number.int(),
    };

    expect(movie.id).toBeDefined();
    expect(movie.tmdb_id).toBeDefined();
    expect(movie.likes).toBeDefined();
  });
});
