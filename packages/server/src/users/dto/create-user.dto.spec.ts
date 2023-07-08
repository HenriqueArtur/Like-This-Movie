import { faker } from '@faker-js/faker';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto interface', () => {
  test('should have the required properties', () => {
    const createUserDto: CreateUserDto = {
      login: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(createUserDto.login).toBeDefined();
    expect(createUserDto.password).toBeDefined();
  });
});
