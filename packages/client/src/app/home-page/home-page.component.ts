import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from '../_services/account.services';
import { MoviesService } from '../_services/movies.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent {
  public loginValid = true;
  public login = '';
  public password = '';
  public homeBanner = '';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private moviesServices: MoviesService
  ) {}

  public ngOnInit(): void {
    const user = this.accountService.userValue;
    if (user) {
      this.router.navigate(['/movies/pt-BR-trending']);
      return;
    }
    this.moviesServices
      .mostTrended()
      .pipe(take(1))
      .subscribe({
        next: (mostTrendedObj: any) => {
          this.homeBanner = `linear-gradient(to bottom, rgba(255,255,255,0.8) 20%, rgba(255,255,255,1)),url(https://image.tmdb.org/t/p/original/${mostTrendedObj.backdrop_path}`;
        },
        error: (err) => console.error(err),
      });
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
