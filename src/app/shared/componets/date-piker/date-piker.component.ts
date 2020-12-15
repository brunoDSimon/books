import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {DateStruct} from '../../models/date-struct.model';
import * as moment from 'moment';

@Component({
  selector: 'app-date-piker',
  templateUrl: './date-piker.component.html',
  styleUrls: ['./date-piker.component.scss']
})
export class DatePikerComponent implements OnInit {
  @Input('init') valoresIniciais: DateStruct;
  @Output() alterarPeriodo: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.date
    console.log(this._date)
  }
  hoveredDate: NgbDate = null;
  private _date: DateStruct = {
    fromDate: moment().toDate(),
    toDate: moment().toDate(),
  }

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
    ) {

    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this._date.fromDate = this.convertData(date)
     }
     else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this._date.toDate = this.convertData(date)

    } else {
      this.toDate = null;
      this.fromDate = date;
      this._date.fromDate = this.convertData(date)

    }
    console.log(date)
    this.alterarPeriodo.emit(this._date);

  }
  convertData(data: NgbDate){
    return new Date(data.year, data.month -1, data.day)
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  get date(): DateStruct {
    return this._date;
  }

}


