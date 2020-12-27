import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherListDaysComponent } from './component/weather-list-days/weather-list-days.component';
import { WeatherComponent } from './component/weather/weather.component';


@NgModule({
  declarations: [
    WeatherListDaysComponent,
    WeatherComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
  ]
})
export class WeatherModule { }
