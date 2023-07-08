import { faker } from '@faker-js/faker';
import { PayloadDto } from './payload.dto';

describe('PayloadDto interface', () => {
  test('should have the required properties', () => {
    const payloadDto: PayloadDto = {
      login: faker.internet.email(),
    };

    expect(payloadDto.login).toBeDefined();
  });
});
