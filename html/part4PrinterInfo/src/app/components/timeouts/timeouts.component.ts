import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncSubject, Observable} from "rxjs";
import {ToJsonService} from "../../services/to-json.service";
import {SocketService} from "../../shared/socket/socket.service";

@Component({
  selector: 'app-timeouts',
  templateUrl: './timeouts.component.html',
  styleUrls: ['./timeouts.component.scss']
})
export class TimeoutsComponent implements OnInit {

  @Output() timeouts = new EventEmitter<any>();
  devices: any[] = [];
  res: any[] = [];
  cres: any[] = [];
  constructor(private json: ToJsonService, private sIO: SocketService) {
  }

  ngOnInit() {
    this.sIO.getTimeOut();
    this.sIO.onMessage().subscribe(message=>{
      this.json.toJSON(message).subscribe(data => {
        if(data['deviceTimeout']) {
          this.res = data['deviceTimeout'];
          if(this.cres !== this.res){
            this.setTimeouts();
          }
        }
      });
    });
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
