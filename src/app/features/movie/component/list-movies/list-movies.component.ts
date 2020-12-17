import { Router } from '@angular/router';
import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  @Input() dados: any = [];
  public showButon: boolean = false;
  constructor(
  private route: Router,
  ) { }

  ngOnInit() {
  }


  public redirect(aux) {
    this.route.navigate([`/movie/detalhe/${aux}`])
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

