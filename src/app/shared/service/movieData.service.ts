import { Service } from 'src/app/shared/service/service';
import { Injectable } from '@angular/core';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService, SessionStorage, LocalStorage } from 'ngx-store-9';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService extends Service{
  @SessionStorage()
  private _listHeader: any [] = [];

  constructor() {
    super();
  }



  get listHeader() {
    console.log(this._listHeader)
    return this._listHeader;
  }

  public setListHeader(list, value) {
    const listContnt = {
      value: value,
      list: list
    }
    this._listHeader.push(listContnt);
  }


  public clearList() {
    delete this._listHeader;

    this._listHeader = [];
  }
}
