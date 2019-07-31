import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Movie } from "../model/movie";
import { environment } from "../../environments/environment";

@Injectable()
export class TmdbApiService {
  photo_url_base: string = "http://image.tmdb.org/t/p/";
  movie_url_base: string = "https://api.themoviedb.org/3/movie/";

  constructor(private httpClient: HttpClient) {}

  convertToModelMovie(e: any): Movie {
    var movie = new Movie();
    movie.id = e.id;
    movie.title = e.title;
    movie.poster_path = e.poster_path;
    movie.overview = e.overview;
    movie.genres = e.genres;
    movie.release_date = e.release_date;
    return movie;
  }

  getMovies(type: string): Observable<any> {
    return this.httpClient.get(
      this.movie_url_base +
        type +
        "?api_key=" +
        environment.tmdb_api_key +
        "&language=en-US&page=1"
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

  getMovieCastByMovieId(id: number): Observable<any> {
    return this.httpClient.get(
      this.movie_url_base + id + "/credits?api_key=" + environment.tmdb_api_key
    );
  }
}
