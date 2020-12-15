import { ReaisPipe } from './../pipe/reais.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesAnoPipe } from '../pipe/mes-ano.pipe';


@NgModule({
  declarations: [
    ReaisPipe,
    MesAnoPipe
  ],
  providers:[
    ReaisPipe,
    MesAnoPipe
  ],
  exports:[
    ReaisPipe,
    MesAnoPipe
  ]
})
export class PipeModule { }
