import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/model/movie";
import { TmdbApiService } from "src/app/services/tmbd-api.service";

@Component({
  selector: "app-movies-navigation",
  templateUrl: "./movies-navigation.component.html",
  styleUrls: ["./movies-navigation.component.css"]
})
export class MoviesNavigationComponent implements OnInit {
  chosenType: string = "POPULAR";
  filterText: string;
  popularMovies: Movie[];
  upcomingMovies: Movie[];
  activeList: Movie[];
  filteredList: Movie[];

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit() {
    this.tmdbApiService.getMovies("popular").subscribe(data => {
      this.popularMovies = data.results.map(e =>
        this.tmdbApiService.convertToModelMovie(e)
      );
      this.activeList = this.popularMovies;
      this.filteredList = this.activeList;
    });
    this.tmdbApiService.getMovies("upcoming").subscribe(data => {
      this.upcomingMovies = data.results.map(e =>
        this.tmdbApiService.convertToModelMovie(e)
      );
    });
  }

  filterMovies(textInput: string): void {
    textInput = textInput.toLocaleLowerCase();
    this.filteredList = this.activeList.filter(
      (movie: Movie) =>
        movie.title.toLocaleLowerCase().indexOf(textInput) !== -1
    );
  }

  chooseList(movies: Movie[], type: string) {
    this.filteredList = movies;
    this.chosenType = type;
    this.filterText = "";
  }
}
