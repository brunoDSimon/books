import { EventEmitterService } from './../../../../shared/service/event-emitter.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _dados: any = [];
  private _error: string = '';
  private _typeError: string = '';
  private sub: any;

  constructor(
    private router: Router
  ) {
    this.emitDados();
  }

  ngOnInit() {
  }

  get error() {
    return this._error;
  }

  get dados() {
    return this._dados;
  }

  get typeError() {
    return this._typeError;
  }

  public urlContry(i) {
    const lowcase = i.toLowerCase()
    return `http://openweathermap.org/images/flags/${lowcase}.png`
  }

  public urlTemp(i) {
    const lowcase = i.toLowerCase()
    return `https://openweathermap.org/img/w/${lowcase}.png`
  }

  public nextDays(i) {
    this.router.navigate([`/home/days/${i}`]);
  }

  public emitDados(){
    EventEmitterService.get('dadosTempo').subscribe((data) => {
      this.closeAll();
      this._dados.push(data)
    });
    EventEmitterService.get('error').subscribe((data) => {
      this.closeAll();
      this._error = data;
      this._typeError = 'danger';
    });
  }

  public closeAll() {
    this._dados = [];
    this._typeError = '';
    this._error     = '';
  }
  ngOnDestroy() {
    this._dados = [];
    EventEmitterService.get('dadosTempo').unsubscribe();
  }

}
