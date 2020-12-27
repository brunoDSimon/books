import { WeatherService } from './../weather/services/weather.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService,
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

  public search = (text$: Observable<string>) =>text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.searchCity(term)))



  public searchCity(value){
    this.weatherService.sharedCity(value).subscribe((res) =>{
      console.log(res)
    },(error: Error) =>{
      console.log(error)
    })
  }

}
