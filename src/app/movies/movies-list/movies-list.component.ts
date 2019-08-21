import { Component, OnInit, Input } from "@angular/core";
import { InteractionService } from "src/app/services/interaction.service";
import { MoviesSelector } from "src/app/model/moviesSelector";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "src/app/model/movie";
import { MongoApiService } from "src/app/services/mongo-api.service";
import { TmdbApiService } from "src/app/services/tmbd-api.service";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit {
  moviesData: MoviesSelector;
  likeIcon = faThumbsUp;
  trashIcon = faTrash;

  constructor(
    private _interactionService: InteractionService,
    private _tmdbApiService: TmdbApiService,
    private _mongoApiService: MongoApiService
  ) {}

  ngOnInit() {
    this._interactionService.selection$.subscribe(
      data => (this.moviesData = data)
    );
  }

  addToFavorites(id: number): void {
    let newFavoriteMovie: Movie = new Movie();
    this._tmdbApiService.getMovieById(id).subscribe(data => {
      newFavoriteMovie = data;
      newFavoriteMovie.video_url = data.videos.results[0]
        ? this._tmdbApiService.video_url_base + data.videos.results[0].key
        : "";
      this._mongoApiService
        .addFavoriteMovie(newFavoriteMovie)
        .subscribe(data => console.log(data));
    });
  }

  removeFromFavorites(mongo_id: string): void {
    this._mongoApiService
      .deleteFavoriteMovie(mongo_id)
      .subscribe(() => console.log("movie deleted"));
  }
}
