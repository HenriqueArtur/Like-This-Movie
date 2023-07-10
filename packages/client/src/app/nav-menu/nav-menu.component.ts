import { Component } from '@angular/core';
import { AccountService } from '../_services/account.services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.sass'],
})
export class NavMenuComponent {
  constructor(private accountService: AccountService) {}

  public logout(): void {
    this.accountService.logout();
  }
}
