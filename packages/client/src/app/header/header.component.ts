import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { AccountService } from '../_services/account.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent {
  title = 'like this movie';
  @Input() public isAuthenticated = false;
  @Output() onLogin = new EventEmitter<any>();

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    const user = this.accountService.userValue;
    if (user) {
      this.isAuthenticated = true;
    }
  }

  public toggleIsAuthenticated() {
    this.isAuthenticated = !this.isAuthenticated;
  }

  public logout(): void {
    this.isAuthenticated = false;
    this.accountService.logout();
  }
}
