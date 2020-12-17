import { NgxSpinnerService } from 'ngx-spinner';
import { MovieService } from './../../service/movie.service';
import { Router } from '@angular/router';
import { MovieDataService } from './../../../../shared/service/movieData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  private _page: number = 1;
  private _pageMax: any;
  private _listData: any = [];
  constructor(
    private movieData:  MovieDataService,
    private router: Router,
    private movieService: MovieService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (this.movieData.listHeader.length) {
      this._listData = this.movieData.listHeader[0].list.results;
    } else {
      this.router.navigate([`/movie`])
    }
  }

  get page() {
    return this._page;
  }

  get pageMax() {
    return this._pageMax;
  }

  get listData() {
    return this._listData =  this.movieData.listHeader[0].list.results;
  }

  public search(value, page){
    this.spinner.show();
    this._listData = [];
    this.movieData.clearList();
    this.movieService.searchMovie(value, this._page).subscribe((res) =>{
      this._listData = res.results;
      this.movieData.setListHeader(res, value);
      setTimeout(() => {this.spinner.hide();}, 500);
    },(error : Error) =>{
      console.log(error)
      setTimeout(() => {this.spinner.hide();}, 500);
    })
  }


  public next() {
    this._page = this._page + 1;
    console.log(this._page);
    this.search(this.movieData.listHeader[0].value, this._page)
  }

  public prev() {
    if (this._page >1) {
      this._page = this._page + 1;
      this.search(this.movieData.listHeader[0].value, this._page)
    }
  }

}