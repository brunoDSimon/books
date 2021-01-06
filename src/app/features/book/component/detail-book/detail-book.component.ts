import { EventEmitterService } from '../../../../shared/service/event-emitter.service';
import { BooksService } from '../../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss']
})
export class DetailBookComponent implements OnInit, OnDestroy {
  private _response: any = [];
  private _responseInfo: any = [];
  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private dataBooks: DataBooksService,
    private toastr: ToastrService,
  ) {
   }

  ngOnInit() {
    this.init();
  }

  get response() {
    return this._response;
  }

  get responseInfo() {
    return this._responseInfo;
  }

  public init(){
    this.route.params.subscribe( parametros => {
      if(typeof parametros.id != 'undefined'){
        this.getBookByID(parametros.id)
      }else{
        this.router.navigate([`/home`])
      }
    });
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

  public getBookByID(i){
    EventEmitterService.get('showLoader').emit();
    this.booksService.getBooksById(i).subscribe((res) =>{
      this._response = res.volumeInfo;
      this._responseInfo = res;
      EventEmitterService.get('hideLoader').emit();
    },(error: Error) =>{
      EventEmitterService.get('hideLoader').emit();
      this.toastr.error(`Erro ao consultar`);
      console.log(error);
    })
  }



  ngOnDestroy() {
    this.router.navigate([], {
      queryParams: {
        paramName: null,
        paramName2: null,
      },
      queryParamsHandling: 'merge'
    })
  }

}
