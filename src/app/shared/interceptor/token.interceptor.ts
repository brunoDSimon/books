import { MovieService } from './../../features/movie/service/movie.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsersDataService } from 'src/app/shared/service/UsersData.service';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private movieService: MovieService,
        private userData: UsersDataService,
        private router: Router
      ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.api_url.split('/');
    const token = '67cee93b4d897d58007f440ce2fee181';
    console.log(token)
    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${token}`} });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
