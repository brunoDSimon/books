import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store-9';

@Injectable({
  providedIn: 'root'
})
export class DataBooksService {
  @LocalStorage()
  private _listBooksFavorites: any = [];
constructor() { }


  get listBooksFavorites() {
    return this._listBooksFavorites;
  }


  public setListBooksFavorites(aux) {
    this._listBooksFavorites.push(aux);
  }
}
