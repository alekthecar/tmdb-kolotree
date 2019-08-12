import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Movie } from "src/app/model/movie";
import { Cast } from "src/app/model/cast";
import { TmdbApiService } from "src/app/services/tmbd-api.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MovieidTransferService } from "src/app/services/movieid-transfer.service";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie = new Movie();
  movieCast: Cast[] = [];
  movieId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmdbApiService: TmdbApiService,
    private sanitizer: DomSanitizer,
    private _idTransferService: MovieidTransferService
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.movieId = id;
    // console.log(this.movieId);
    this._idTransferService.sendMovieId(this.movieId);
    this.tmdbApiService.getMovieById(id).subscribe(data => {
      this.movie = this.tmdbApiService.convertToModelMovie(data);
      this.movie.youtube_key = data.videos.results[0]
        ? data.videos.results[0].key
        : "";
      this.movie.video_url =
        "https://www.youtube.com/embed/" + this.movie.youtube_key;
    });
    this.tmdbApiService.getMovieCastByMovieId(id).subscribe(data => {
      this.movieCast = data;
    });
  }

  onBack(): void {
    this.router.navigate(["/movies"]);
    this._idTransferService.sendMovieId(-1);
  }
}
