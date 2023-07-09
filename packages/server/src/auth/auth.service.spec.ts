import { AuthService } from './auth.service';
import { UserMongoService } from 'src/users/services/mongo-user.service';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  const userService: UserMongoService = new UserMongoService(jest.fn() as any);
  const authService: AuthService = new AuthService(userService);

  describe('signPayload', () => {
    it('should return a signed JWT token', async () => {
      const payload = {
        login: faker.internet.email(),
      };
      const token = 'jwt_token';

      jest
        .spyOn(authService, 'signPayload')
        .mockImplementation(async () => token);

      const result = await authService.signPayload(payload);

      expect(result).toBe(token);
      expect(authService.signPayload).toHaveBeenCalledWith(payload);
    });
  });

  describe('validateUser', () => {
    it('should call findByPayload method of UserMongoService with the provided payload', async () => {
      const payload = {
        login: faker.internet.email(),
      };

      jest
        .spyOn(userService, 'findByPayload')
        .mockImplementation(async () => null);

      await authService.validateUser(payload);

      expect(userService.findByPayload).toHaveBeenCalledWith(payload);
    });

    it('should return the result of findByPayload method of UserMongoService', async () => {
      const login = faker.internet.email();
      const payload = {
        login,
      };

      const spy = jest
        .spyOn(userService, 'findByPayload')
        .mockImplementation(async () => jest.fn() as any);

      await authService.validateUser(payload);
      expect(spy).toBeCalledWith(payload);
    });
  });
});
