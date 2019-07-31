import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from 'src/app/model/movie';
import { Cast } from 'src/app/model/cast';
import { TmdbApiService } from 'src/app/services/tmbd-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = new Movie();
  movieCast: Cast[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tmdbApiService: TmdbApiService,
    private sanitizer: DomSanitizer) {
  }
  
  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.tmdbApiService.getMovieById(id).subscribe(data => {
      this.movie = this.tmdbApiService.convertToModelMovie(data);
      this.movie.youtube_key = data.videos.results[0]
        ? data.videos.results[0].key
        : "";
      this.movie.video_url =
        "https://www.youtube.com/embed/" + this.movie.youtube_key;
    });
    this.tmdbApiService.getMovieCastByMovieId(id).subscribe(data => {
      data.cast.forEach(element => {
        this.movieCast.push(this.convertToCast(element));
      });
    });
    // console.log(this.movie);
    // console.log(this.movieCast);
  }

  convertToCast(e: any): Cast {
    var cast = new Cast();
    cast.name = e.name;
    cast.character = e.character;
    cast.profile_path = e.profile_path;
    return cast;
  }

  onBack(): void {
    this.router.navigate(["/movies"]);
  }

}
