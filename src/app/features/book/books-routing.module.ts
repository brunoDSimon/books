import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherListDaysComponent } from './component/weather-list-days/weather-list-days.component';
import { BooksComponent } from './component/books/books.component';

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'days/:id', component: WeatherListDaysComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
