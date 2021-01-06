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
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { LoaderComponent } from './shared/componets/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    MomentModule,
    WebStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    DateFormatPipe,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
