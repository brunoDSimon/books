import { Injectable } from '@angular/core';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService, SessionStorage, LocalStorage } from 'ngx-store-9';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  @SessionStorage()
  private _token: {
    expires_at: null,
    request_token: null,
    success: null
  };

  constructor(
   private router: Router,
  ) { }

  get token() {
    return this._token;
  }

  get request_token() {
    return this._token.request_token
  }


  public setAuth(aux: any) {
   this._token = aux;
  }

  public clear() {
   delete this._token;
  }


}
