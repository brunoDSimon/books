import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule} from 'ngx-mask'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessengerDadosComponent } from '../componets/messenger-dados/messenger-dados.component';
import { MessengerErrorComponent } from '../componets/messenger-error/messenger-error.component';

@NgModule({
  imports: [
    CommonModule,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgbModule,
  ],
  declarations: [
    MessengerDadosComponent,
    MessengerErrorComponent
  ],
  exports:[
    MessengerDadosComponent,
    MessengerErrorComponent
  ],
  providers:[

  ]
})
export class SharedModule { }
