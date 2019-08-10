import { Component, OnInit, Input } from "@angular/core";
import { InteractionService } from "src/app/services/interaction.service";
import { MoviesSelector } from "src/app/model/moviesSelector";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit {
  moviesData: MoviesSelector;

  constructor(private _interactionService: InteractionService) {}

  ngOnInit() {
    this._interactionService.selection$.subscribe(
      data => (this.moviesData = data)
    );
  }
}
