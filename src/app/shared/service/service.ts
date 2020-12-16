import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {Messege} from '../models/messege';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Response } from '../models/response';
import { DefaultResponse } from '../models/default-response.mode';
@Injectable({
  providedIn: 'root'
})
export class Service {

  _headers: HttpHeaders;
  constructor() {
    this._headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  get headers() {
    return this._headers;
  }
  filter(response: DefaultResponse, calllback?: any) {
    if ((response.success && response.status_code == '1') || (response.success )) {
      return response.results;
    } else if (response.status_message ) {
      throw new Error(response.status_message);
    } else {
      throw new Error(Messege.erro_inesperado);
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
