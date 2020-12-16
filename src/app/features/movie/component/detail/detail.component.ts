import { MovieService } from './../../service/movie.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private _movie: any = [];
  private _listRecomendation: any =[];
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private movieService: MovieService,
    private routerNavegation: Router,

  ) { }

  ngOnInit() {
    this._movie = [];
    this._listRecomendation = [];
    this.init();
  }

  public init(){
    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        console.log(parametros.id)
        console.log()
        if(typeof parametros.id != 'undefined'){
          this.getMovieDetail(parametros.id);
          this.getRecommendation(parametros.id);
        }else{
          console.log('informado nao foi incontrado')
        }
      }
    });
  }


  get movie() {
    return this._movie;
  }

  get listRecomendation() {
    return this._listRecomendation;
  }

  public getMovieDetail(id) {
    this.spinner.show();
    this._movie = [];
    this.movieService.getDetailMovie(id).subscribe((res) =>{
      this._movie = res;
      setTimeout(() => {this.spinner.hide();}, 500);
      console.log(this._movie)
    },(error: Error) =>{
      console.log(error);
      setTimeout(() => {this.spinner.hide();}, 1000);
    })
  }

  public getRecommendation(id){
    this._listRecomendation = [];
    this.movieService.getRecommendation(id).subscribe((res) =>{
      this.replaceArray(res.results)
      setTimeout(() => {this.spinner.hide();}, 500);
    },(error: Error) =>{
      console.log(error);
      setTimeout(() => {this.spinner.hide();}, 1000);
    })
  }

  public replaceArray(result) {
  let corte = 10;

  for (var i = 0; i < result.length; i = i + corte) {
    this._listRecomendation.push(result.slice(i, i + corte));
  }
  console.log(this._listRecomendation);
  }

  public redirect(aux) {
    this.routerNavegation.navigate([`/movie/detalhe/${aux}`])
  }
}
