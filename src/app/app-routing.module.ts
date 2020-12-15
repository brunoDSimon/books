import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
  {
    path: 'movie',
    loadChildren: () => import('./features/movie/movie.module').then(m => m.MovieModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
