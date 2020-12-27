import { EventEmitterService } from './../../../../shared/service/event-emitter.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _dados: any = []
  private sub: any;

  constructor(
    private router: Router
  ) {
    EventEmitterService.get('dadosTempo').subscribe(data => this._dados.push(data));
  }

  ngOnInit() {
  }

  get dados() {
    return this._dados;
  }
  ngOnDestroy() {
    EventEmitterService.get('dadosTempo').unsubscribe();
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
}
