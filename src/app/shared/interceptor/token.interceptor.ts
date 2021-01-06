import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/features/book/services/books.service';
import { DataBooksService } from '../service/dataBooks.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private dataBooks: DataBooksService
        ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.api_auth.split('/');
    const token = this.dataBooks.dadosUser[0].xc.access_token;
    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${token}`} });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
