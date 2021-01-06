import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'
import { EventEmitterService } from '../../service/event-emitter.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription
  constructor(
  ) { }

  ngOnInit() {
    this.subscription = EventEmitterService.get('showLoader').subscribe(() =>{
      this.show = true;
    });

    this.subscription = EventEmitterService.get('hideLoader').subscribe(() =>{
      this.show = false;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
