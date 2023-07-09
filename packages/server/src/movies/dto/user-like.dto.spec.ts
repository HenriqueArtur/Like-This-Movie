import { faker } from '@faker-js/faker';
import { UsersLikesDto } from './user-like.dto';

describe('UsersLikesDto interface', () => {
  test('should have the required properties', () => {
    const userLike: UsersLikesDto = {
      id: faker.database.mongodbObjectId(),
      tmdb_id: faker.number.int(),
      user_id: faker.database.mongodbObjectId(),
    };

    expect(userLike.id).toBeDefined();
    expect(userLike.tmdb_id).toBeDefined();
    expect(userLike.user_id).toBeDefined();
  });
});
