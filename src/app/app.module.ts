import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AlertModule } from "ngx-bootstrap";

import { MoviesNavigationComponent } from "./movies/movies-navigation/movies-navigation.component";
import { MoviesListComponent } from "./movies/movies-list/movies-list.component";
import { MovieDetailsComponent } from "./movies/movie-details/movie-details.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TmdbApiService } from './services/tmbd-api.service';
import { OverviewCutterPipe } from './pipes/overview-cutter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesNavigationComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    PageNotFoundComponent,
    OverviewCutterPipe
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, AlertModule.forRoot()],
  providers: [TmdbApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
