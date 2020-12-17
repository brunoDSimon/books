import { DetailComponent } from './component/detail/detail.component';
import { MovieComponent } from './component/movie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDetailComponent } from './component/search-detail/search-detail.component';

const routes: Routes = [
  {path: '', component: MovieComponent},
  {path: 'detalhe/:id', component: DetailComponent},
  {path: 'search', component: SearchDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
