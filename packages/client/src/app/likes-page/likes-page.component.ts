import { Component } from '@angular/core';
import { Movie } from '../movie/movie.model';
import { MoviesService } from '../_services/movies.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.sass'],
})
export class LikesPageComponent {
  movies: Movie[] = [];

  constructor(private moviesServices: MoviesService) {}

  public ngOnInit(): void {
    this.moviesServices
      .trendMovies()
      .pipe(take(1))
      .subscribe({
        next: (movies) => {
          this.movies = movies
            .sort((a, b) => {
              if (a.likes !== b.likes) {
                return b.likes - a.likes;
              }
              return a.position + 1 - (b.position + 1);
            })
            .map((m, index) => ({
              ...m,
              position: index + 1,
            }));
        },
        error: (_) => {},
      });
  }
}
