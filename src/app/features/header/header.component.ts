import { NgxSpinnerService } from 'ngx-spinner';
import { MovieDataService } from './../../shared/service/movieData.service';
import { Observable } from 'rxjs';
import { MovieService } from './../movie/service/movie.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from 'src/app/shared/service/UsersData.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchField: ElementRef;
  private _open:boolean = false;
  private _logado:boolean = false;
  private _msgError: any;
  private _typeError: any
  public formGroup: FormGroup

  constructor(
    private router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private movieData:  MovieDataService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
  }

  get logado(){
    return this._logado
  }

  get open(){
    return this._open
  }

  get msgError() {
    return this._msgError;
  }

  get typeError() {
    return this._typeError;
  }

  public abri(){
    this._open = true;
    const search = this.searchField;
    setTimeout(() => {
      search.nativeElement.focus()
    }, 350);
  }

  public hideSearch() {
    this._open = false;
    this.searchField.nativeElement.value = '';
    this.formGroup.reset();
  }
  public formatter = (result: string) => result.toUpperCase();

  public searchTeste = (text$: Observable<string>) =>text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.search(term)))



  public search(value){
    this.spinner.show();
    this.movieData.clearList();
    this.movieService.searchMovie(value,1).subscribe((res) =>{
      if (res.results.length) {
        this.movieData.setListHeader(res, value);
        this.router.navigate([`/movie/search`])
        console.log('entrou ')
        setTimeout(() => {this.spinner.hide();}, 500);
      } else {
        alert('Não há dados')
        this._msgError = 'Não há dados';
        this._typeError = 'info';
        console.log('saiu ')
        setTimeout(() => {this.spinner.hide();}, 500);
      }
    },(error : Error) =>{
      this._msgError = 'Não há dados';
      this._typeError = 'danger';
      setTimeout(() => {this.spinner.hide();}, 500);
    })
  }
  value = null;

}
