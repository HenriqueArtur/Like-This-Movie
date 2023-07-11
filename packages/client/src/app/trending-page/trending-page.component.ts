import { Component } from '@angular/core';
import { Movie } from '../movie/movie.model';
import { MoviesService } from '../_services/movies.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.sass'],
})
export class TrendingPageComponent {
  movies: Movie[] = [];

  constructor(private moviesServices: MoviesService) {}

  public ngOnInit(): void {
    this.moviesServices
      .trendMovies()
      .pipe(take(1))
      .subscribe({
        next: (movies) => {
          this.movies = movies;
        },
        error: (_) => {},
      });
  }
}
