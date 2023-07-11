import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { faker } from '@faker-js/faker';
import { UserMongoService } from 'src/users/services/mongo-user.service';

describe('AuthController', () => {
  const userService: UserMongoService = new UserMongoService(jest.fn() as any);
  const authService: AuthService = new AuthService(jest.fn() as any);
  const controller: AuthController = new AuthController(
    userService,
    authService,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user and return the user and token', async () => {
      const id = faker.database.mongodbObjectId();
      const login = faker.internet.email();
      const password = faker.internet.password();
      const registerDto: RegisterDto = {
        login,
        password,
      };

      const createdUser = {
        id,
        login,
      };

      const token = 'token';

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createdUser);
      jest.spyOn(authService, 'signPayload').mockResolvedValueOnce(token);

      const result = await controller.register(registerDto);

      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(registerDto);
      expect(authService.signPayload).toHaveBeenCalledTimes(1);
      expect(authService.signPayload).toHaveBeenCalledWith({
        id,
        login,
      });
      expect(result).toEqual({ user: createdUser, token });
    });
  });

  describe('login', () => {
    it('should log in a user and return the user and token', async () => {
      const id = faker.database.mongodbObjectId();
      const login = faker.internet.email();
      const password = faker.internet.password();
      const loginDto: LoginDto = {
        login,
        password,
      };

      const user = {
        id,
        login,
      };

      const token = 'token';

      jest.spyOn(userService, 'findByLogin').mockResolvedValueOnce(user);
      jest.spyOn(authService, 'signPayload').mockResolvedValueOnce(token);

      const result = await controller.login(loginDto);

      expect(userService.findByLogin).toHaveBeenCalledTimes(1);
      expect(userService.findByLogin).toHaveBeenCalledWith(loginDto);
      expect(authService.signPayload).toHaveBeenCalledTimes(1);
      expect(authService.signPayload).toHaveBeenCalledWith({
        id,
        login,
      });
      expect(result).toEqual({ user, token });
    });
  });
});
