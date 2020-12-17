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
  public formGroup: FormGroup
  public model: any;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private movieData:  MovieDataService
  ) {}

  ngOnInit() {
  }
  get logado(){
    return this._logado
  }
  get open(){
    return this._open
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
    this.movieData.clearList();
    this.movieService.searchMovie(value,1).subscribe((res) =>{
      this.movieData.setListHeader(res, value);
      this.router.navigate([`/movie/search`])
    },(error : Error) =>{
      console.log(error)
    })
  }

}
