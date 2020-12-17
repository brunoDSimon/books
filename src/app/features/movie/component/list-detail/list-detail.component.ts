import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  @Input() movie: any = [];
  public showButon: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  public convertHour(hour) {
    const result = hour / 60;
    return result.toFixed(2).replace(".", "H")
  }
  public scrolToElement() {
    document.querySelector('#home').scrollIntoView({block: 'end',behavior: 'smooth'});
  }


  @HostListener('window:scroll', [])
 public  isScrollUpDown() {
    const scrolTop = window.scrollY;
    if( scrolTop > 280) {
      this.showButon = true;
     } else {
      this.showButon = false;
     }
  }
}
