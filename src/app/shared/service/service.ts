import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {Messege} from '../models/messege';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Response } from '../models/response';
@Injectable({
  providedIn: 'root'
})

export class Service {
  private _headers: HttpHeaders;
  private _headerNoAuth: HttpHeaders
  constructor() {
    this._headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    this._headerNoAuth = new HttpHeaders({'Content-Type':  'application/json', 'Authorization': ''})

  }


  get headers() {
    return this._headers;
  }

  get headerNoAuth() {
    return this._headerNoAuth;
  }

  filter(response: Response, calllback?: any) {
    console.log(response);
    if (response.cod  === '200') {
      return response;
    } else if (response.cod === '404' ) {
      throw new Error(response.message);
    } else {
      throw new Error(response.message);
    }
  }
  handleError(err: any) {
    if (!(err instanceof Error)) {
      return new Error(Messege.erro_inesperado);
    } else {
      return err;
    }
  }
}
