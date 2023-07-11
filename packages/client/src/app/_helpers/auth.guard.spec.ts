import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.services';
import { AuthGuard } from './auth.guard';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { faker } from '@faker-js/faker';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AccountService, HttpClient, HttpHandler],
    });
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    accountService = TestBed.inject(AccountService);
  });

  it('should allow access if user is logged in', () => {
    jest.spyOn(accountService, 'userValue', 'get').mockReturnValue({
      user: {
        id: faker.database.mongodbObjectId(),
        login: faker.internet.email(),
      },
      token: faker.string.nanoid(16),
    });
    const result = authGuard.canActivate();
    expect(result).toBe(true);
  });

  it('should redirect to the home page and disallow access if user is not logged in', () => {
    jest.spyOn(accountService, 'userValue', 'get').mockReturnValue(null);
    const navigateSpy = jest.spyOn(router, 'navigate');

    const result = authGuard.canActivate();

    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
