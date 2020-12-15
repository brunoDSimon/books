import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {
  @Input() dados: any = [];

  constructor() { }

  ngOnInit() {
  }

}
