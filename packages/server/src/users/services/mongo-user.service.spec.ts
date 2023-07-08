import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMongoService } from './mongo-user.service';
import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserMongo } from '../interfaces/user-mongo.model';

describe('UserMongoService', () => {
  let service: UserMongoService;
  let userModel: Model<UserMongo>;

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
    userModel = module.get<Model<UserMongo>>(getModelToken('User'));
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

    it('should user exist', async () => {
      const login = faker.internet.email();
      const password = faker.internet.password();
      const doc: CreateUserDto = {
        login,
        password,
      };
      jest
        .spyOn(userModel.prototype, 'save')
        .mockRejectedValueOnce(new Error('User already exists'));

      try {
        await service.create(doc);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        expect(error.getResponse()).toBe('user already exists');
      }
    });
  });
});
