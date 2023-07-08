import { faker } from '@faker-js/faker';
import { User } from './user.interface';

describe('User interface', () => {
  test('should have the required properties', () => {
    const user: User = {
      id: faker.string.uuid(),
      login: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(user.id).toBeDefined();
    expect(user.login).toBeDefined();
    expect(user.password).toBeDefined();
  });
});
