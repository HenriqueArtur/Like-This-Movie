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
      .mostLiked()
      .pipe(take(1))
      .subscribe({
        next: (movies) => {
          this.movies = movies;
        },
        error: (_) => {},
      });
  }
}
