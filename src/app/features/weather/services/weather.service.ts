import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/shared/service/service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends Service{

constructor(
  private http: HttpClient
) {
  super();
 }


 public sharedCity(city): Observable<any>{
  return this.http.get(environment.api_url+`weather?q=${city}&appid=${environment.api_key}&lang=pt_br&units=metric`).pipe(
    map((res) =>{
      return res
    },catchError((error: any) => {
        throw this.handleError(error);
      })
    )
    )
  }


  public sharedCityNextDays(idCity): Observable<any>{
    // api.openweathermap.org/data/2.5/forecast?id=3456068&appid=58ce88c80722b3377ef30064c2e9a183&units=metric
    return this.http.get(environment.api_url+`forecast?id=${idCity}&appid=${environment.api_key}&lang=pt_br&units=metric`).pipe(
      map((res) =>{
        return res
      },catchError((error: any) => {
          throw this.handleError(error);
        })
      )
      )
    }
}
