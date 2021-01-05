import { EventEmitterService } from '../../../../shared/service/event-emitter.service';
import { BooksService } from '../../services/books.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';

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
    private datePipe: DatePipe,
    private router: Router,
    private dataBooks: DataBooksService

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
      } else {
        this.dataBooks.setListBooksFavorites(i);
      }
    } else {
      this.dataBooks.setListBooksFavorites(i);
    }
  }

  public getBookByID(i){
    this.booksService.getBooksById(i).subscribe((res) =>{
      this._response = res.volumeInfo;
      this._responseInfo = res;
      console.log(this._response);
    },(error: Error) =>{
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
