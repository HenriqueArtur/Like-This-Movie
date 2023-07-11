export interface MovieApi {
  id: string;
  backdrop_path: string;
  title: string;
  original_title: string;
  poster_path: string;
  tmdb_id: number;
  likes: number;
  userLiked: boolean;
}
