import { Component, Input } from '@angular/core';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent {
  @Input() movie!: Movie;

  toggleLike(event: any) {
    this.movie.likes = this.movie.likes + (this.movie.isLiked ? -1 : 1);
    this.movie.isLiked = !this.movie.isLiked;
  }
}
