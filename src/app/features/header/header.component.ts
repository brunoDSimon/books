import { WeatherService } from './../weather/services/weather.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EventEmitterService } from 'src/app/shared/service/event-emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchField: ElementRef;
  public formGroup: FormGroup
  public list: any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private weatherService: WeatherService,
  ) {}

  ngOnInit() {
  }

  public formatter = (result: string) => result.toUpperCase();

  public search = (text$: Observable<string>) =>text$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.searchCity(term)))



  public searchCity(value){
    this.weatherService.sharedCity(value).subscribe((res) =>{
      EventEmitterService.get('dadosTempo').emit(res);
    },(error: Error) =>{
      console.log(error)
    })
  }

}
