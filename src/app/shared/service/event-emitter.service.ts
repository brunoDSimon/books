import { EventEmitter  } from '@angular/core';

export class EventEmitterService{
  private static emmiters: { [nomeEvento: string]: EventEmitter<any>} = {};

  static get(nomeEvento: string): EventEmitter<any>{
    if(!this.emmiters[nomeEvento]){
      this.emmiters[nomeEvento] = new EventEmitter<any>();
    }
    return this.emmiters[nomeEvento];
  }

}
