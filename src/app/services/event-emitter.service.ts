import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  favMovieAdded: EventEmitter<void> = new EventEmitter<void>();
  favMovieDeleted: EventEmitter<void> = new EventEmitter<void>();
  subsVar: Subscription;
  subsVar2: Subscription;
  
  constructor() { }

  onLikeIconClick() {
    this.favMovieAdded.emit();
  }

  onDeleteIconClick() {
    this.favMovieDeleted.emit();
  }
}
