import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from '../_services/account.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent {
  public loginValid = true;
  public login = '';
  public password = '';

  constructor(private router: Router, private accountService: AccountService) {}

  public ngOnInit(): void {
    const user = this.accountService.userValue;
    if (user) {
      this.router.navigate(['/movies/pt-BR-trending']);
      return;
    }
  }

  public onSubmit(): void {
    this.loginValid = true;

    this.accountService
      .login(this.login, this.password)
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.loginValid = true;
          this.router.navigateByUrl('/movies/pt-BR-trending');
        },
        error: (_) => (this.loginValid = false),
      });
  }
}
