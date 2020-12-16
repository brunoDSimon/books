import { MovieService } from './../../service/movie.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private _movie: any = [];
  private _productionCompanies: any = [];
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.init();
  }

  public init(){
    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        console.log(parametros.id)
        console.log()
        if(typeof parametros.id != 'undefined'){
          this.getMovieDetail(parametros.id);
        }else{
          console.log('informado nao foi incontrado')
        }
      }
    });
  }


  get movie() {
    return this._movie;
  }

  get productionCompanies() {
    return this._productionCompanies;
  }

  public getMovieDetail(id) {
    this.spinner.show();
    this._movie = [];
    this.movieService.getDetailMovie(id).subscribe((res) =>{
      this._movie = res;
      this._productionCompanies = res.production_companies;
      console.log(this._productionCompanies);
      setTimeout(() => {this.spinner.hide();}, 500);
      console.log(this._movie)
    },(error: Error) =>{
      console.log(error);
      setTimeout(() => {this.spinner.hide();}, 1000);
    })
  }

}
