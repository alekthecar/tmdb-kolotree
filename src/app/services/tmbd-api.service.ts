import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../model/movie";
import { Cast } from "../model/cast";
import { environment } from "../../environments/environment";
import { MoviesData } from "../model/moviesData";
import { CastData } from "../model/castData";

@Injectable()
export class TmdbApiService {
  movie_url_base: string = "https://api.themoviedb.org/3/movie/";
  photo_url_base: string = "http://image.tmdb.org/t/p/";
  video_url_base: string = "https://www.youtube.com/embed/";

  constructor(private httpClient: HttpClient) {}

  getMovies(type: string): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(
        this.movie_url_base +
          type +
          "?api_key=" +
          environment.tmdb_api_key +
          "&language=en-US&page=1"
      )
      .pipe(
        map(response => {
          return response.results;
        })
      );
  }

  getMovieById(id: number): Observable<any> {
    return this.httpClient.get(
      this.movie_url_base +
        id +
        "?api_key=" +
        environment.tmdb_api_key +
        "&append_to_response=videos"
    );
  }

  getMovieCastByMovieId(id: number): Observable<Cast[]> {
    return this.httpClient
      .get<CastData>(
        this.movie_url_base +
          id +
          "/credits?api_key=" +
          environment.tmdb_api_key
      )
      .pipe(
        map(response => {
          return response.cast;
        })
      );
  }
}
