export class MovieMostLikedApi {
  id?: string;
  tmdb_id?: number;
  likes?: number;
  userLiked?: boolean;
  tmdb_obj?: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
}
