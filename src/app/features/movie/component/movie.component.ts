import { UsersDataService } from 'src/app/shared/service/UsersData.service';
import { MovieService } from './../service/movie.service';
import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  private _listMovie: any = [];
  private _page: number = 1;
  private _pageMax: any;
  constructor(
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


  public auth() {
    this.movieService.auth().subscribe((res) =>{
      console.log('entra')
      this.userData.setAuth(res);
      console.log(res);
    },(error: Error) =>{
      console.log(error);
    })
  }

  public next() {
    this._page = this._page + 1;
    console.log(this._page);
    this.getMovies(this._page);
  }

  public prev() {
    if (this._page >1) {
      this._page = this._page + 1;
      this.getMovies(this._page);
      console.log(this._page);
    }
  }

}
