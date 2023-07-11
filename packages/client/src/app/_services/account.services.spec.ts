import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { faker } from '@faker-js/faker';
import { AccountService } from './account.services';
import { environment } from 'src/environments/environment';

describe('AccountService', () => {
  let accountService: AccountService;
  let router: Router;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AccountService, AccountService, HttpClient, HttpHandler],
    });
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  describe('userValue', () => {
    it('should be exist user', () => {
      jest
        .spyOn(accountService, 'userValue' as any, 'get')
        .mockReturnValueOnce({
          value: {
            user: {
              id: faker.database.mongodbObjectId(),
              login: faker.internet.email(),
            },
            token: faker.string.nanoid(16),
          },
        });
      expect(accountService.userValue).toBeTruthy();
    });

    it('should be NOT exist user', () => {
      jest
        .spyOn(accountService, 'userValue' as any, 'get')
        .mockReturnValueOnce(null);

      expect(accountService.userValue).toBeFalsy();
    });
  });

  describe('login', () => {
    it('should success login', () => {
      const login = faker.internet.email();
      const password = faker.internet.password();
      const user = {
        user: {
          id: faker.database.mongodbObjectId(),
          login: faker.internet.email(),
        },
        token: faker.string.nanoid(16),
      };
      jest.spyOn(httpClient, 'post').mockReturnValueOnce({
        pipe: () => user,
      } as any);
      const response = accountService.login(login, password);
      expect(response).toBe(user);
      expect(httpClient.post).toBeCalledWith(
        `${environment.apiUrl}/auth/login`,
        {
          login,
          password,
        }
      );
    });
  });

  describe('logout', () => {
    it('should success logout', () => {
      jest.spyOn(router, 'navigate');
      accountService.logout();
      expect(router.navigate).toBeCalledWith(['/']);
    });
  });

  describe('register', () => {
    it('should success register', () => {
      const login = faker.internet.email();
      const password = faker.internet.password();
      const user = {
        user: {
          id: faker.database.mongodbObjectId(),
          login: faker.internet.email(),
        },
        token: faker.string.nanoid(16),
      };
      jest.spyOn(httpClient, 'post').mockReturnValueOnce({
        pipe: () => user,
      } as any);
      const response = accountService.register(login, password);
      expect(response).toBe(user);
      expect(httpClient.post).toBeCalledWith(
        `${environment.apiUrl}/auth/register`,
        {
          login,
          password,
        }
      );
    });
  });
});
