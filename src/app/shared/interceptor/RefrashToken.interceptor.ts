import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import {map, catchError} from 'rxjs/operators'
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { DataBooksService } from '../service/dataBooks.service';
@Injectable()
export class RefrashTokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private dataBooks: DataBooksService
      ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

      return next.handle(request).pipe(catchError(error =>{
       if(error instanceof HttpErrorResponse){
        switch (error.status) {
          case 401:
           return this.handle401Error(error)
        }
       }else{

       }
      })

      )

  }
  handle401Error(error) {
    console.log(error)
    if (error.status === 401 && error.error.err === 'Token expired') {
      console.log('caiu no handle', error.status === 401 && error.error.err === 'Token expired')
      this.dataBooks.clearUser();
    }
    return observableThrowError(error);
}
}
