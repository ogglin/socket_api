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
  @Output() date = new EventEmitter<any>();
  infos: any[] = [];
  info: any;
  place: string;
  ioConnection: any;
  data: any;
  result: any;
  Query: string;
  changeLog: any[] = [];

  constructor(private sIO: SocketService, private json: ToJsonService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`)
    }
    this.sIO.getInfos(this.did, this.interval['start'], this.interval['end']);
  }

  ngOnInit() {
    this.sIO.getInfos(this.did, this.interval['start'], this.interval['end']);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message => {
        this.json.toJSON(message).subscribe(data => {
          console.log(data);
          if (data['infos']) {
            this.infos = data['infos']['content'];
            if (this.infos.length > 0) {
              this.info = this.infos[0];
              this.data = this.infos[0]['datetime'];
              const device = [{
                productName: this.info['productname'],
                url: this.info['url'],
                serialNumber: this.info['sn'],
                device_id: this.info['device_id']
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
    this.sIO.send_put(this.Query);
  }
}
