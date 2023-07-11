import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.services';
import { Movie } from '../movie/movie.model';
import { MovieApi } from './models/movie.model';

const TMDB_IMG_ROOT_PATH = 'https://image.tmdb.org/t/p/w500';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  trendMovies() {
    return this.http
      .get<MovieApi[]>(`${environment.apiUrl}/movies`, {
        headers: {
          Authorization: `Bearer ${this.accountService.userValue?.token}`,
        },
      })
      .pipe(
        map((response) => {
          return response.map(
            (m, index) =>
              ({
                id: m.id,
                position: index + 1,
                title: m.title,
                likes: m.likes,
                isLiked: m.userLiked,
                tmdb_id: m.tmdb_id,
                imagePath: `${TMDB_IMG_ROOT_PATH}${m.poster_path}`,
              } as Movie)
          );
        })
      );
  }

  mostTrended() {
    return this.http.get(`${environment.apiUrl}/movies/most-trended`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  like(tmdb_id: number) {
    return this.http.post<null>(
      `${environment.apiUrl}/movies/toggle-like/${tmdb_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.accountService.userValue?.token}`,
        },
      }
    );
  }
}
