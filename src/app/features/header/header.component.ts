import { Component, OnInit } from '@angular/core';
import { UsersDataService } from 'src/app/shared/service/UsersData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _open:boolean = false;
  private _logado:boolean = false;
  constructor(
    private userData: UsersDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  get logado(){
    return this._logado
  }
  get open(){
    return this._open
  }
  public abri(){
    return this._open =! this._open
  }
}
