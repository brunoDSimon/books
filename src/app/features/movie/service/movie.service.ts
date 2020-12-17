import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators'
import { Service } from 'src/app/shared/service/service';
import { DateFormatPipe } from 'ngx-moment';
import { environment } from '../../../../environments/environment';
import { DefaultResponse } from 'src/app/shared/models/default-response.mode';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends Service{
  private _token: string = '67cee93b4d897d58007f440ce2fee181';
constructor(
  private http: HttpClient,
) {
  super()
}
  public getMovies(page): Observable<any>{
    const params = {
      page: page
    }
    const filtro = new URLSearchParams(params).toString();
    return this.http.get(environment.api_url+`/movie/popular?api_key=${this._token}&language=pt-br&`+filtro, {headers: this.headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

  public getTrending(page, type, date): Observable<any>{
    const params = {
      page: page
    }
    const filtro = new URLSearchParams(params).toString();
    return this.http.get(environment.api_url+`/trending/${type}/${date}?api_key=${this._token}&`+ filtro ,{headers: this.headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

  public getDetailMovie(id):Observable<any>{
    return this.http.get(environment.api_url+`/movie/${id}?api_key=${this._token}&language=pt-br`, {headers: this.headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

  public getRecommendation(id):Observable<any> {
    return this.http.get(environment.api_url+`/movie/${id}/recommendations?api_key=${this._token}&language=pt-br&page=1`, {headers: this.headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

  public searchMovie(movie): Observable<any>{
    const params = {
      api_key: this._token,
      query: movie
    }
    const filtro = new URLSearchParams(params).toString();
    return this.http.get(environment.api_url+`/search/multi?`+filtro, {headers: this.headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }


  public auth() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    })
    const chave = '67cee93b4d897d58007f440ce2fee181';
    return this.http.get<any>(environment.api_url+`/authentication/token/new?api_key=${chave}`, {headers: headers}).pipe(
      map(res =>{
        return res
      }),catchError((error: any) => {
          throw this.handleError(error);
        }
      )
    )
  }

}
