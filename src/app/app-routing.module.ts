import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AppComponent } from "./app.component";
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MoviesNavigationComponent } from './movies/movies-navigation/movies-navigation.component';

const routes: Routes = [
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  { path: "movies", component: MoviesNavigationComponent },
  { path: "movies/:id", component: MovieDetailsComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
