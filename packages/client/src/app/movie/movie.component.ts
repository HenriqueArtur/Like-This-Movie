import { Component, Input } from '@angular/core';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent {
  @Input() movie!: Movie;

  toggleLike() {
    console.debug('pressed');
  }
}
