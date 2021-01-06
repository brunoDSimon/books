import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from 'ngx-store-9';

@Injectable({
  providedIn: 'root'
})
export class DataBooksService {
  @LocalStorage()
  private _listBooksFavorites: any = [];
  @SessionStorage()
  private _dadosUser: any = [];
constructor() { }


  get listBooksFavorites() {
    return this._listBooksFavorites;
  }

  get dadosUser() {
    return this._dadosUser;
  }

  public setDadosUser(aux) {
    this.dadosUser.push(aux);
  }

  public setListBooksFavorites(aux) {
    this._listBooksFavorites.push(aux);
  }

  public clearUser() {
    delete this._dadosUser;

    this._dadosUser = [];
  }
}
