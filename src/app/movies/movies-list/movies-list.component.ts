import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "src/app/model/movie";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit {

  @Input() filteredList: Movie[];
  @Input() movieType: string;
  
  constructor() {}

  ngOnInit() {}
}
