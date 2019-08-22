import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/model/movie";
import { MoviesSelector } from "src/app/model/moviesSelector";
import { TmdbApiService } from "src/app/services/tmbd-api.service";
import { MongoApiService } from "src/app/services/mongo-api.service";
import { InteractionService } from "src/app/services/interaction.service";
import { MovieidTransferService } from "src/app/services/movieid-transfer.service";
import { EventEmitterService } from "src/app/services/event-emitter.service";

@Component({
  selector: "app-movies-navigation",
  templateUrl: "./movies-navigation.component.html",
  styleUrls: ["./movies-navigation.component.css"]
})
export class MoviesNavigationComponent implements OnInit {
  chosenType: string = "POPULAR";
  filterText: string = "";
  popularMovies: Movie[];
  upcomingMovies: Movie[];
  favoriteMovies: Movie[];
  activeList: Movie[];
  filteredList: Movie[];
  selector: MoviesSelector = new MoviesSelector();
  selectedMovieId: number = -1;

  constructor(
    private tmdbApiService: TmdbApiService,
    private mongoApiService: MongoApiService,
    private _interactionService: InteractionService,
    private _idTransferService: MovieidTransferService,
    private _eventEmitterService: EventEmitterService
  ) {}

  ngOnInit() {
    this._idTransferService.movieId$.subscribe(id => {
      this.selectedMovieId = id;
    });
    this.tmdbApiService.getMovies("popular").subscribe(pMovies => {
      this.popularMovies = pMovies;
      this.activeList = this.popularMovies;
      this.filteredList = this.activeList;
      this.sendDataToMovieList(
        this.chosenType,
        this.popularMovies,
        this.filterText
      );
    });
    this.tmdbApiService.getMovies("upcoming").subscribe(uMovies => {
      this.upcomingMovies = uMovies;
    });
    this.getFavoriteMovies();
    if (this._eventEmitterService.subsVar == undefined) {
      this._eventEmitterService.subsVar = this._eventEmitterService.favMovieAdded.subscribe(
        () => this.getFavoriteMovies()
      );
    }
    if (this._eventEmitterService.subsVar2 == undefined) {
      this._eventEmitterService.subsVar2 = this._eventEmitterService.favMovieDeleted.subscribe(
        () => {
          this.mongoApiService.getMovies().subscribe(fMovies => {
            this.favoriteMovies = fMovies;
            this.chooseListFromMenu("FAVORITE", this.favoriteMovies);
          });
        }
      );
    }
  }

  filterMovies(textInput: string): void {
    textInput = textInput.toLocaleLowerCase();
    this.filteredList = this.activeList.filter(
      (movie: Movie) =>
        movie.title.toLocaleLowerCase().indexOf(textInput) !== -1
    );
    this.sendDataToMovieList(this.chosenType, this.filteredList, textInput);
  }

  chooseListFromMenu(type: string, list: Movie[]): void {
    this.chosenType = type;
    this.activeList = list;
    this.filteredList = this.activeList;
    this.filterText = "";
    this.selectedMovieId = -1;
    this.sendDataToMovieList(type, list, this.filterText);
  }

  sendDataToMovieList(type: string, list: Movie[], filter: string): void {
    this.selector.type = type;
    this.selector.list = list;
    this.selector.textFilter = filter;
    this._interactionService.selectMovies(this.selector);
  }

  getFavoriteMovies() {
    this.mongoApiService.getMovies().subscribe(fMovies => {
      this.favoriteMovies = fMovies;
    });
  }
}
