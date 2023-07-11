import { Component, Input } from '@angular/core';
import { Movie } from './movie.model';
import { MoviesService } from '../_services/movies.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent {
  @Input() movie!: Movie;

  constructor(private moviesServices: MoviesService) {}

  toggleLike() {
    this.movie.likes = this.movie.likes + (this.movie.isLiked ? -1 : 1);
    this.movie.isLiked = !this.movie.isLiked;
    this.moviesServices
      .like(this.movie.tmdb_id)
      .pipe(take(1))
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error(error);
        },
      });
  }
}
