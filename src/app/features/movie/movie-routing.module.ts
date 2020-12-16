import { DetailComponent } from './component/detail/detail.component';
import { MovieComponent } from './component/movie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: MovieComponent},
  {path: 'detalhe/:id', component: DetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
