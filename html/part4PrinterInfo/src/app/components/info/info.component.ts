import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {ToJsonService} from "../../services/to-json.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() did: number;
  @Input() cid: number;
  @Input() office: string;
  @Input() interval: object;
  @Input() device: object;
  @Input() timeouts: any[];
  @Output() date = new EventEmitter<any>();
  infos: any[] = [];
  info: any;
  place: string;
  data: any;
  result: any;
  Query: string;
  changeLog: any[] = [];
  btn_disable: boolean = false;
  ioConnection: any;
  init: boolean = false;

  constructor(private sIO: SocketService, private json: ToJsonService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.init) {
      this.initIoConnection();
    }
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`)
    }
    if(this.did !== null) {
      const pos = this.timeouts.map(function(e) { return e.id; }).indexOf(this.did);
      this.timeouts.forEach(dev=>{
        if(dev.id === this.did){
          this.timeOut(dev.time);
        }
      });
      if(pos < 0) {
        this.timeOut(120000);
      }
      this.sIO.getInfos(this.did, this.interval['start'], this.interval['end']);
      setTimeout(()=>{this.init = true;}, 300);
    } else {
      this.info = null;
      this.infos = [];
    }
    this.Query = '{"server_init": "getDevices", "company_id":' + this.cid + ',"devices": [' +
      JSON.stringify(this.device) + ']}';
  }

  private initIoConnection(): void {
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message => {
        this.json.toJSON(message).subscribe(data => {
          if (data['infos']) {
            console.log(data);
            this.infos = data['infos']['content'];
            if (this.infos.length > 0) {
              this.info = this.infos[0];
              this.data = this.infos[0]['datetime'];
              const device = [{
                productname: this.info['productname'],
                url: this.info['url'],
                serialnumber: this.info['sn'],
                id: this.info['device_id']
              }];
              this.Query = '{"server_init": "getDevices", "company_id":' + this.cid + ',"devices": ' +
                JSON.stringify(device) + '}';
            }
          }
          if (data['putInfo']) {
            this.result = data['putInfo']['status'];
            if (this.result === 'success') {
              this.sIO.getInfos(this.did, this.interval['start'], this.interval['end']);
            }
          }
          if (data['putDevice']) {
            this.result = data['putDevice']['status']['result'];
            if (this.result === 'success') {
              this.sIO.getInfos(this.did, this.interval['start'], this.interval['end']);
            }
          }
        });
      });
  }

  toggle(id) {
    const e = {
      init: 'info',
      id: id
    };
    this.date.emit(e);
  }

  setDate(d) {
    this.data = d;
    this.infos.forEach(inf => {
      if (inf['datetime'] === d) {
        this.info = inf;
      }
    });
  }

  sendQuery() {
    this.btn_disable = true;
    this.sIO.send_put(this.Query);

  }
  timeOut(t){
    this.btn_disable = true;
    if (t !== 120000) {
      setTimeout(()=>{this.btn_disable = false; this.sIO.getTimeOut()}, 120000-t);
    } else {
      this.btn_disable = false;
    }
  }
}
