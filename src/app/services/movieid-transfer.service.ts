import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MovieidTransferService {
  private _movieIdSource = new Subject<number>();
  movieId$ = this._movieIdSource.asObservable();

  constructor() {}

  sendMovieId(id: number): void {
    this._movieIdSource.next(id);
  }
}
