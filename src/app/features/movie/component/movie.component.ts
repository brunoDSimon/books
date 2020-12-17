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
  private _mediaType: any = [
    {label:'Todos', value: 'all'},
    {label:'Filme', value: 'movie'},
    {label:'Tv', value: 'tv'},
  ];

  private _timeWindow: any = [
    {label: 'Dia', value: 'day'},
    {label: 'Mês', value: 'week'},
  ]

  public currentMediaType: any  = this._mediaType[0];
  public currentTimeWindos: any = this._timeWindow[0];
  constructor(
    private movieService: MovieService,
    private userData: UsersDataService,
    private ngbRating: NgbRatingConfig,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.getTrending(this._page, this.currentMediaType.value, this.currentTimeWindos.value);
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

  get mediaType() {
    return this._mediaType;
  }

  get timeWindow() {
    return this._timeWindow;
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

  public getTrending(pagina, type, date) {
    this.spinner.show();
    this._listMovie = [];
    this.movieService.getTrending(pagina, type, date).subscribe((res) =>{
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
    this.getTrending(this._page, this.currentMediaType.value, this.currentTimeWindos.value);
  }

  public prev() {
    if (this._page >1) {
      this._page = this._page + 1;
      this.getTrending(this._page, this.currentMediaType.value, this.currentTimeWindos.value);
    }
  }

  public changeFilterType(aux) {
    this.currentMediaType = aux;
    this.getTrending(this._page, aux.value ,this.currentTimeWindos.value);
  }

  public changeFilterTime(aux) {
    this.currentTimeWindos = aux;
    this.getTrending(this._page, this.currentMediaType.value, aux.value);
  }

}
