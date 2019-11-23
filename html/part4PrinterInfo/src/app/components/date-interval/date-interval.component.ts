import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {FormControl} from "@angular/forms";
import * as moment from 'moment';
@Component({
  selector: 'app-date-interval',
  templateUrl: './date-interval.component.html',
  styleUrls: ['./date-interval.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class DateIntervalComponent implements OnInit {

  @Output() data = new EventEmitter<any>();
  start = new FormControl(moment([2019, 0, 1]));
  end = new FormControl((new Date()).toISOString());
  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
    this.setDate();
  }
  setDate(){
    let body;
    if(this.end.value instanceof Date){
      body = {
        start: this.start.value.toISOString(),
        end: this.end.value.toISOString()
      };
    } else {
      body = {
        start: this.start.value.toISOString(),
        end: (new Date()).toISOString()
      };
    }
    this.data.emit(body);
  }
}
