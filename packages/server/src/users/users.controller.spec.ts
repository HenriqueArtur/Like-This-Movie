import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserMongoService } from './services/mongo-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UserMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UserMongoService,
        {
          provide: getModelToken('User'),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserMongoService>(UserMongoService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const id = faker.database.mongodbObjectId();
      const login = faker.internet.email();
      const password = faker.internet.password();
      const createUserDto: CreateUserDto = {
        login,
        password,
      };

      const createdUser: User = {
        id,
        login,
        password,
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createdUser);

      const result = await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(createdUser);
    });
  });
});
