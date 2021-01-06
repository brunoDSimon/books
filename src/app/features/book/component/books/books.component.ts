import { EventEmitterService } from '../../../../shared/service/event-emitter.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  private _dados: any = [];
  private _listaBooks: any = [];
  private _error: string = '';
  private _typeError: string = '';
  private sub: any;

  constructor(
    private router: Router,
    private dataBooks: DataBooksService,
    private toastr: ToastrService,
  ) {
    this.emitDados();
  }

  ngOnInit() {
  }

  get error() {
    return this._error;
  }

  get dados() {
    return this._dados;
  }

  get typeError() {
    return this._typeError;
  }

  get listaBooks() {
    return this._listaBooks;
  }

  public filterFill(aux) {
    let content = this.dataBooks.listBooksFavorites.filter(item => item.id == aux.id );
    if (content.length) {
      return 'ic-heart fill'
    } else {
      return 'ic-heart'
    }
  }

  public setBooksFavorires(i){
    if (this.dataBooks.listBooksFavorites.length) {
      const index = this.dataBooks.listBooksFavorites.findIndex((aux) =>aux.id == i.id)
      if ( index != -1) {
        this.dataBooks.listBooksFavorites.splice(index, 1);
        this.toastr.info(`Removido dos favoritos`);
      } else {
        this.dataBooks.setListBooksFavorites(i);
        this.toastr.success(`Adicionado aos favoritos`);
      }
    } else {
      this.dataBooks.setListBooksFavorites(i);
      this.toastr.success(`Adicionado aos favoritos`);
    }
  }

  public viewDetail(i) {
    this.router.navigate([`/home/detail/${i}`]);
  }

  public emitDados(){
    EventEmitterService.get('dadosBook').subscribe((data) => {
      this.closeAll();
      this._dados = data;
      this._listaBooks = data;
      setTimeout(() => {
        document.querySelector('#home').scrollIntoView({block: 'start',behavior: 'smooth'});
      }, 1000);
    });
    EventEmitterService.get('error').subscribe((data) => {
      this.closeAll();
      this._error = data;
      this._typeError = 'danger';
    });
  }


  public nextPage() {
    EventEmitterService.get('nextPage').emit();
  }

  public closeAll() {
    this._dados = [];
    this._listaBooks = [];
    this._typeError = '';
    this._error     = '';
  }

  ngOnDestroy() {
    this.closeAll();
    this.router.navigate([], {
      queryParams: {
        paramName: null,
        paramName2: null,
      },
      queryParamsHandling: 'merge'
    })
  }

}
