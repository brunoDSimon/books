import { PipeModule } from './shared/modules/pipe.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule,DateFormatPipe } from 'ngx-moment';
import { WebStorageModule } from 'ngx-store-9';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaskModule} from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from "ngx-currency";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxSpinnerModule } from "ngx-spinner";
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCurrencyModule,
    PipeModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    MomentModule,
    WebStorageModule,
    BrowserAnimationsModule,
    NgxSpinnerModule

  ],
  providers: [
    DateFormatPipe,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt'}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
