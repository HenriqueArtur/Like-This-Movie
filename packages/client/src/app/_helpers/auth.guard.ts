import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate() {
    const user = this.accountService.userValue;
    if (user) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
