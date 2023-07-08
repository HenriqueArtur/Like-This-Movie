import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMongoService } from './mongo-user.service';
import { faker } from '@faker-js/faker';

describe('UserMongoService', () => {
  let service: UserMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMongoService,
        {
          provide: getModelToken('User'),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<UserMongoService>(UserMongoService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const id = faker.database.mongodbObjectId();
      const login = faker.internet.email();
      const password = faker.internet.password();
      const doc: CreateUserDto = {
        login,
        password,
      };

      const saveSpy = jest.spyOn(service, 'create').mockResolvedValueOnce({
        id,
        login,
      });

      const result = await service.create(doc);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id,
        login,
      });
    });
  });
});
