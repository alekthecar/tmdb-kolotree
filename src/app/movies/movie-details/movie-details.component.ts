import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movieId = +this.route.snapshot.paramMap.get("id");
  }

}
