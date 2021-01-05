import { PipeModule } from 'src/app/shared/modules/pipe.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BooksRoutingModule } from './books-routing.module';
import { WeatherListDaysComponent } from './component/weather-list-days/weather-list-days.component';
import { BooksComponent } from './component/books/books.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    WeatherListDaysComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    PipeModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule { }
