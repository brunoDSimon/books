import { Observable } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EventEmitterService } from 'src/app/shared/service/event-emitter.service';
import { BooksService } from '../book/services/books.service';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('search') searchField: ElementRef;
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;

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
    // if (this.dataBooks.dadosUser.length) {
    //   this.user = this.dataBooks.dadosUser[0];
    //   this.gapiSetup = true
    // } else {
    //   this.checkIfUserAuthenticated();
    //   this.user = this.authInstance.currentUser.get();
    // }
  }

  get userDados() {
    return this.user;
  }

  get userAuth() {
    return this.authInstance;
  }

  get favoritos() {
    return this.dataBooks.listBooksFavorites;
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
    EventEmitterService.get('dadosBook').emit([]);
    this.router.navigate([`/home`]);
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

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });
    console.log(pload);
    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '1007319950820-n846p21em6fndeq4ablm9lrbdl8dhgct.apps.googleusercontent.com' })
        .then(auth => {
          console.log(auth)
          this.gapiSetup = true;
          this.authInstance = auth;
          this.dataBooks.clearUser();
          this.dataBooks.setDadosUser(this.authInstance.currentUser.get())
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet

      await this.initGoogleAuth();


    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.user = user,
        error => this.error = error);
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
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
