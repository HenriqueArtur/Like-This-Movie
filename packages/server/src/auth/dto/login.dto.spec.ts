import { faker } from '@faker-js/faker';
import { LoginDto } from './login.dto';

describe('LoginDto interface', () => {
  test('should have the required properties', () => {
    const loginDto: LoginDto = {
      login: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(loginDto.login).toBeDefined();
    expect(loginDto.password).toBeDefined();
  });
});
