import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { faker } from '@faker-js/faker';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    userService = moduleRef.get<UsersService>('UsersService');
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        login: faker.internet.email(),
        password: faker.internet.password(),
      };
      const createdUser: User = {
        id: 'random-id',
        ...createUserDto,
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result: User = await controller.create(createUserDto);

      expect(result).toBe(createdUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
