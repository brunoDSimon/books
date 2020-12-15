import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from './loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  activeRequests = 0;
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.activeRequests ===0){
        this.showLoader()
      }
      this.activeRequests++;
      return next.handle(req).pipe(finalize(() =>{
        this.activeRequests--;
        if(this.activeRequests === 0){
          this.hideLoader();
        }
      }))
    }

    private onEnd(){
      this.hideLoader();
    }

    private showLoader(){
      this.loaderService.show();
    }

    private hideLoader(){
      this.loaderService.hide();
    }
}
