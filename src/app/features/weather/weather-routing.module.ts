import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherListDaysComponent } from './component/weather-list-days/weather-list-days.component';
import { WeatherComponent } from './component/weather/weather.component';

const routes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'days/:id', component: WeatherListDaysComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
