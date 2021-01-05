import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EventEmitterService } from 'src/app/shared/service/event-emitter.service';
import { BooksService } from '../book/services/books.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('search') searchField: ElementRef;

  public formGroup: FormGroup
  public list: any = [];
  private _startIndex: any = 0;
  private _term;
  constructor(
    private router: Router,
    private booksService: BooksService,
    private dataBooks: DataBooksService
  ) {
    EventEmitterService.get('nextPage').subscribe(() =>{
      this._startIndex = this._startIndex + 40;
      this.searchBook(this._term);
    })
    EventEmitterService.get('favorites').subscribe(data =>{
     this.favoritesBooks(data);
    })
  }

  ngOnInit() {

    // this.getFavorires();
    // this.booksService.auth().subscribe((res) =>{
    //   console.log(res)
    // },(error) =>{
    //   console.log(error)
    // })
  }

  public formatter = (result: string) => result.toUpperCase();

  public search = (text$: Observable<string>) =>text$.pipe(
    debounceTime(700),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.searchBook(term)))



  public searchBook(value){
    EventEmitterService.get('showLoader').emit();
    this.router.navigate([`/home`])
    this.booksService.sharedBook(value, this._startIndex).subscribe((res) =>{
      this._term = value
      EventEmitterService.get('hideLoader').emit();
      EventEmitterService.get('dadosBook').emit(res.items);
    },(error) =>{
      this.router.navigate([`/home`])
      EventEmitterService.get('hideLoader').emit();
      EventEmitterService.get('error').emit();
      console.log()
    })
  }

  public viewFavorites() {
    this.router.navigate([`/home`])
    setTimeout(() => {
      EventEmitterService.get('dadosBook').emit(this.dataBooks.listBooksFavorites);
    }, 1000);
  }

  public back() {
    this.router.navigate([`/home`])
  }


  public getFavorires() {
    return this.booksService.viewBooksFavorites().subscribe((res) =>{
      console.log(res);
    },(error) =>{
      // this.router.navigate([`/home`])
      // EventEmitterService.get('error').emit();
      console.log(error)
    })
  }

  public favoritesBooks(id) {
    return this.booksService.addBooksFavorites(id).subscribe((res) =>{
      console.log(res);
    },(error) =>{
      // this.router.navigate([`/home`])
      // EventEmitterService.get('error').emit();
      console.log(error)
    })
  }

  ngOnDestroy() {
    EventEmitterService.get('dadosBook').unsubscribe();
    EventEmitterService.get('error').unsubscribe();
    this.router.navigate([], {
      queryParams: {
        paramName: null,
        paramName2: null,
      },
      queryParamsHandling: 'merge'
    })
  }
}
