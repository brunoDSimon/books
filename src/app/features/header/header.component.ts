import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from 'src/app/shared/service/UsersData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchField: ElementRef;
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
    this._open = true;
    const search = this.searchField;
    setTimeout(() => {
      search.nativeElement.focus()
    }, 350);
  }

  public hideSearch() {
    this._open = false;
    this.searchField.nativeElement.value = '';
  }
}
