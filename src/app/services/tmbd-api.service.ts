import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Movie } from "../model/movie";
import { environment } from "../../environments/environment";
import { Cast } from "../model/cast";

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

  getMovies(type: string): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
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
      .get<Cast[]>(
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
