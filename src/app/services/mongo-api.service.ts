import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../model/movie";

@Injectable({
  providedIn: "root"
})
export class MongoApiService {
  url_base: string = "http://localhost:8080/movies/api";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient) {}

  addFavoriteMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(
      this.url_base + "/add",
      JSON.stringify(movie),
      this.httpOptions
    );
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url_base + "/all");
  }
  
  deleteFavoriteMovie(mongo_id: string) {
    return this.httpClient.delete(this.url_base + "/delete/" + mongo_id);
  }
}
