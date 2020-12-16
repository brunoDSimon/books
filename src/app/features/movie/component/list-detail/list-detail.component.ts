import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  @Input() movie: any = [];

  constructor() { }

  ngOnInit() {
  }
  public convertHour(hour) {
    const result = hour / 60;
    return result.toFixed(2).replace(".", "H")
  }
}
