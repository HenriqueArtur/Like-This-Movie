import { Component } from '@angular/core';
import { Movie } from '../movie/movie.model';
import { MoviesService } from '../_services/movies.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.sass'],
})
export class MoviePageComponent {
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
