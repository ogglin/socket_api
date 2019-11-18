import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {ToJsonService} from "../../services/to-json.service";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @Input() cid: number;
  @Input() oid: number;
  @Output() did = new EventEmitter<any>();
  devices: any[] = [];
  device: any;
  cdid: number;
  initDevices: any[] = [];
  Query: string;
  places: any[] = [];
  selected = 'Все';
  ioConnection: any;

  constructor(private sIO: SocketService, private json: ToJsonService) {
  }

  ngOnInit() {
    this.sIO.getDevices(this.cid, this.oid, 1);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message => {
        this.json.toJSON(message).subscribe(data => {
          if (data['devices']) {
            this.devices = data['devices'];
            if (this.devices.length > 0) {
              this.device = this.devices[0];
              this.cdid = this.devices[0]['id'];
              const e = {
                init: 'device',
                id: this.devices[0]['id']
              };
              this.initDevices = this.devices;
              this.devices.forEach(dev=>{
                if(this.places.indexOf(dev['placement']) < 0 && dev['placement'] !== ' ') {
                  this.places.push(dev['placement']);
                }

              });
              this.Query = '{"server_init": "getDevices", "company_id":' + this.cid+',"devices": '+
                JSON.stringify(this.initDevices) +'}';
              this.did.emit(e);
            }
          }
        });
      });
  }
  toggle(id){
    this.device = this.devices.filter(dev=>dev[id]);
    this.cdid = id;
    const e = {
      init: 'device',
      id: id
    };
    this.did.emit(e);
  }

  setPlace(e) {
    if(e !== '') {
      this.initDevices = this.devices.filter(dev=>dev['placement'] === e.toLowerCase());
    } else {
      this.initDevices = this.devices
    }
    this.Query = '{"server_init": "getDevices", "company_id":' + this.cid+',"devices": '+
      JSON.stringify(this.initDevices) +'}';
  }

  sendQuery(){
    this.sIO.send_put(this.Query);
  }

}
