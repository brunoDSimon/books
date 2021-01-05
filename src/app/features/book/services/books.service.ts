import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/shared/service/service';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends Service{

constructor(
  private http: HttpClient
) {
  super();
 }


 public sharedBook(texto, startIndex): Observable<any>{
   const params = {
    q: texto,
    startIndex: startIndex,
    maxResults: '40',
    key: environment.api_key2,
    orderBy: 'relevance'
   }
   const filtro = new URLSearchParams(params).toString();
  return this.http.get<any>(environment.api_url2+`volumes?`+ filtro).pipe(
    map((res) =>{
      return res
    },catchError((error: any) => {
        throw this.handleError(error);
      })
    )
    )
  }

  public getBooksById(id){
    // https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
      //                                           volumes/zyTCAlFPjgYC?projection=lite&key=yourAPIKey
    return this.http.get<any>(environment.api_url2+`volumes/${id}?projection=full&key=${environment.api_key2}` ).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
          throw this.handleError(error);
        })
      ))
  }

  public viewBooksFavorites() {
    // https://www.googleapis.com/books/v1/mylibrary/bookshelves/7/volumes?key=yourAPIKey
    // https://www.googleapis.com/books/v1/mylibrary/bookshelves/shelf/volumes
    // GET https://www.googleapis.com/books/v1/
    //     https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=yourAPIKey
    return this.http.get<any>(environment.api_url2+`users/109560447740086631754/bookshelves/1001?key=${environment.api_key2}`).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
        throw this.handleError(error);
      }))
    )
  }

  public addBooksFavorites(id):Observable<any> {
    const params = {
      volumeId: id,
      key: environment.api_key2,
     }
    let body = {
    }
    const filtro = new URLSearchParams(params).toString();

    // https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=NRWlitmahXkC&key=yourAPIKey
    return this.http.post<any>(environment.api_url2 + `mylibrary/bookshelves/1001/addVolume?` +filtro, body).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
        throw this.handleError(error);
      }))
    )
  }


  public removeBooksFavorites(id) {
    const params = {
      volumeId: id,
      key: environment.api_key2,
     }
    let body = {
    }
    const filtro = new URLSearchParams(params).toString();

    //                                                 mylibrary/bookshelves/0/removeVolume?volumeId=NRWlitmahXkC&key=yourAPIKey
    return this.http.post<any>(environment.api_url2 + `mylibrary/bookshelves/1001/removeVolume?` +filtro, body).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
        throw this.handleError(error);
      }))
    )
  }

  public auth():Observable<any> {
     let  body = {
      apiKey: environment.api_key2,
      client_id: '1007319950820-n846p21em6fndeq4ablm9lrbdl8dhgct.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/books',
      response_type: 'openid '
      }
    return this.http.post<any>(environment.api_auth,  body).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
        throw this.handleError(error);
      }))
    )
  }

}
