import { Injectable } from "@angular/core";
import { MoviesSelector } from "../model/moviesSelector";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InteractionService {
  selector: MoviesSelector;
  private _selectionSource: BehaviorSubject<MoviesSelector>;
  selection$: Observable<MoviesSelector>;

  constructor() {
    this.selector = new MoviesSelector();
    this._selectionSource = new BehaviorSubject<MoviesSelector>(this.selector);
    this.selection$ = this._selectionSource.asObservable();
  }

  selectMovies(selector: MoviesSelector): void {
    this.selector = selector;
    this._selectionSource.next(this.selector);
  }
}
