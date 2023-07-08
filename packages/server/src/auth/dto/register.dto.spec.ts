import { faker } from '@faker-js/faker';
import { RegisterDto } from './register.dto';

describe('RegisterDto interface', () => {
  test('should have the required properties', () => {
    const registerDto: RegisterDto = {
      login: faker.internet.email(),
      password: faker.internet.password(),
    };

    expect(registerDto.login).toBeDefined();
    expect(registerDto.password).toBeDefined();
  });
});
