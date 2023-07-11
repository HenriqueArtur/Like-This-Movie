import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass'],
})
export class RegisterPageComponent {
  public registerValid = true;

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
    this.accountService
      .register(this.login, this.password)
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.router.navigateByUrl('/movies/pt-BR-trending');
        },
        error: (err) => {
          this.registerValid = false;
          console.error(err);
        },
      });
  }
}
