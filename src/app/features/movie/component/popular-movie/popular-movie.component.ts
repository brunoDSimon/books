import { MovieService } from './../../service/movie.service';
import { UsersDataService } from './../../../../shared/service/UsersData.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss']
})
export class PopularMovieComponent implements OnInit {
  private _listMovie: any = [];
  private _page: number = 1;
  private _pageMax: any;

  constructor(
    private route: Router,
    private movieService: MovieService,
    private userData: UsersDataService,
    private ngbRating: NgbRatingConfig,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getMovies(this._page);
  }

  get listMovie() {
    return this._listMovie.sort((a, b) => {return b.vote_average - a.vote_average });
  }

  get page() {
    return this._page;
  }

  get pageMax() {
    return this._pageMax;
  }

  public next() {
    this._page = this._page + 1;
    console.log(this._page);
    this.getMovies(this._page);
  }

  public prev() {
    if (this._page >1) {
      this._page = this._page - 1;
      this.getMovies(this._page);
    }
  }



  public getMovies(pagina) {
    this.spinner.show();
    this._listMovie = [];
    this.movieService.getMovies(pagina).subscribe((res) =>{
      this._listMovie = res.results;
      this._pageMax = res.total_pages;
      setTimeout(() => {this.spinner.hide();}, 500);
      console.log(this._listMovie)
    },(error: Error) =>{
      console.log(error);
      setTimeout(() => {this.spinner.hide();}, 1000);
    })
  }

  public redirect(aux) {
    this.route.navigate([`/movie/detalhe/${aux}`])
  }
}
