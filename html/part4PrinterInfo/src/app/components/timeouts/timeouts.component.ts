import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timeouts',
  templateUrl: './timeouts.component.html',
  styleUrls: ['./timeouts.component.scss']
})
export class TimeoutsComponent implements OnInit {

  @Output() timeouts = new EventEmitter<any>();
  @Input() deviceTimeout: any[];
  devices: any[] = [];
  res: any[] = [];
  cres: any[] = [];
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.res = changes['deviceTimeout'].currentValue;
    if(this.cres !== this.res){
      this.setTimeouts();
    }
  }
  ngOnInit() {
    //this.sIO.getTimeOut();
  }

  setTimeouts(){
    this.cres = this.res;
    let body = [];
    this.cres.forEach(r=>{
      const ndata = new Date();
      const dat = new Date(r.time);
      // @ts-ignore
      const t = ndata - dat;
      body.push({
        id: r.id,
        time: t
      });
    });
    this.timeouts.emit(body);
  }
}
