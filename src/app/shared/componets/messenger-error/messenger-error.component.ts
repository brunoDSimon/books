import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messenger-error',
  templateUrl: './messenger-error.component.html',
  styleUrls: ['./messenger-error.component.scss']
})
export class MessengerErrorComponent implements OnInit {
  @Input() msg: any = null;
  @Input() type: any = null;

  public ngbAlert = {
    type: this.type,
    msg: this.msg
  }
  constructor() { }

  ngOnInit() {
  }


  public close() {
    this.msg  = null;
    this.type = null;
  }
}
