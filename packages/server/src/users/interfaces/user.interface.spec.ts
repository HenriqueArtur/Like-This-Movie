import { faker } from '@faker-js/faker';
import { User } from './user.interface';

describe('User interface', () => {
  test('should have the required properties', () => {
    const user: User = {
      id: faker.string.uuid(),
      login: faker.internet.email(),
    };

    expect(user.id).toBeDefined();
    expect(user.login).toBeDefined();
  });
});
