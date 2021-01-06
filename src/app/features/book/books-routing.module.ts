import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './component/books/books.component';
import { DetailBookComponent } from './component/detail-book/detail-book.component';

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'detail/:id', component: DetailBookComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
