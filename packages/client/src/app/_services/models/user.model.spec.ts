import { faker } from '@faker-js/faker';
import { User } from './user.model';

describe('User interface', () => {
  test('should have the required properties', () => {
    const user: User = {
      user: {
        id: faker.database.mongodbObjectId(),
        login: faker.internet.email(),
      },
      token: faker.string.nanoid(16),
    };

    expect(user.user).toBeDefined();
    expect(user.token).toBeDefined();
  });
});
