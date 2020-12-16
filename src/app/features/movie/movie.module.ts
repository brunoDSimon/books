import { DetailComponent } from './component/detail/detail.component';
import { ListMoviesComponent } from './component/list-movies/list-movies.component';
import { MovieComponent } from './component/movie.component';
import { SharedModule } from './../../shared/modules/shared.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/app/shared/modules/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule} from 'ngx-mask'
import { CustomFormsModule } from 'ngx-custom-validators';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';




import { NgxSpinnerModule } from "ngx-spinner";
import { MovieRoutingModule } from './movie-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    MovieRoutingModule,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    CustomFormsModule,
    NgbModule,
    QRCodeModule,
    NgxSpinnerModule,
  ],
  declarations: [
    MovieComponent,
    ListMoviesComponent,
    DetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieModule { }
