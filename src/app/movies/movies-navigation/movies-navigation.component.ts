import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/model/movie";
import { TmdbApiService } from "src/app/services/tmbd-api.service";

@Component({
  selector: "app-movies-navigation",
  templateUrl: "./movies-navigation.component.html",
  styleUrls: ["./movies-navigation.component.css"]
})
export class MoviesNavigationComponent implements OnInit {
  title: string = "TMDB MOVIES";
  chosenType: string = "POPULAR";
  filterText: string;
  popularMovies: Movie[];
  upcomingMovies: Movie[];
  activeList: Movie[];
  filteredList: Movie[];

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit() {
    this.tmdbApiService.getMovies('popular').subscribe(data => {
      this.popularMovies = data.results.map(e =>
        this.tmdbApiService.convertToModelMovie(e)
      );
      this.activeList = this.popularMovies;
      console.log(this.activeList);
      this.filteredList = this.activeList;
      console.log(this.filteredList);
    });
    this.tmdbApiService.getMovies('upcoming').subscribe(data => {
      this.upcomingMovies = data.results.map(e =>
        this.tmdbApiService.convertToModelMovie(e)
      );
      console.log(this.upcomingMovies);
    });
  }

  filterMovies(textInput: string): void {
    textInput = textInput.toLocaleLowerCase();
    this.filteredList = this.activeList.filter(
      (movie: Movie) =>
        movie.title.toLocaleLowerCase().indexOf(textInput) !== -1
    );
  }

  setPopular() {
    this.filteredList = this.popularMovies;
    this.chosenType = "POPULAR";
    this.filterText = "";
  }
  
  setUpcoming() {
    this.filteredList = this.upcomingMovies;
    this.chosenType = "UPCOMING";
    this.filterText = "";
  }
}
