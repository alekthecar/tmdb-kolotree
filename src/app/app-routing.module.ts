import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  { path: "movies", component: MoviesListComponent },
  { path: "movies/:id", component: MovieDetailsComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
