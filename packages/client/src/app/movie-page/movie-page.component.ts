import { Component } from '@angular/core';
import { Movie } from '../movie/movie.model';

const TMDB_IMG_ROOT_PATH = 'https://image.tmdb.org/t/p/original';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.sass'],
})
export class MoviePageComponent {
  movies: Movie[] = [
    {
      position: 1,
      imagePath: `${TMDB_IMG_ROOT_PATH}${'/4yycSPnchdNAZirGkmCYQwTd3cr.jpg'}`,
      title: 'Guardiões da Galáxia: Vol. 3',
      likes: 1,
      isLiked: false,
    },
    {
      position: 2,
      imagePath: `${TMDB_IMG_ROOT_PATH}${'/wDWAA5QApz5L5BKfFaaj8HJCAQM.jpg'}`,
      title: 'Guardiões da Galáxia: Vol. 3',
      likes: 100,
      isLiked: true,
    },
  ];
}
