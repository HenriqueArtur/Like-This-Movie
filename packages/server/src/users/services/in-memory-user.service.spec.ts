import { Test } from '@nestjs/testing';
import { InMemoryUserService } from './in-memory-user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.model';
import { faker } from '@faker-js/faker';

describe('InMemoryUserService', () => {
  let service: InMemoryUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [InMemoryUserService],
    }).compile();
    service = moduleRef.get<InMemoryUserService>(InMemoryUserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        login: faker.internet.email(),
        password: faker.internet.password(),
      };
      const createdUser: User = await service.create(createUserDto);
      expect(createdUser).toBeDefined();
      expect(createdUser.id).toBeDefined();
      expect(createdUser.login).toEqual(createUserDto.login);
      expect(createdUser.password).toEqual(createUserDto.password);
    });
  });
});
