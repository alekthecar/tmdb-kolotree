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

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url_base + "/all");
  }

  addFavoriteMovie(movie: Movie): Observable<Movie> {
    console.log("from addFavoriteMovie");
    return this.httpClient.post<Movie>(
      this.url_base + "/add",
      JSON.stringify(movie),
      this.httpOptions
    );
  }

  deleteFavoriteMovie(mongo_id: string) {
    console.log("from deleteFavoriteMovie");
    console.log(mongo_id);
    return this.httpClient.delete(this.url_base + "/delete/" + mongo_id);
  }
}
