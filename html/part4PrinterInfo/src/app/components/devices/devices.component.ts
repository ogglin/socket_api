import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {ToJsonService} from "../../services/to-json.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @Input() cid: number;
  @Input() oid: number;
  @Input() timeouts: any[];
  @Output() did = new EventEmitter<any>();
  filtered: Observable<string[]>;
  placeControl = new FormControl('');
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

  ngOnChanges(changes: SimpleChanges) {
    if(this.timeouts){

    }
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
                id: this.devices[0]['id'],
                device: this.device
              };
              this.initDevices = this.devices;
              this.devices.forEach(dev=>{
                if(dev['placement']) {
                  dev['placement'].replace(/\s+/g, ' ').trim();
                  if(this.places.indexOf(dev['placement']) < 0 && dev['placement'] !== ' ') {
                    this.places.push(dev['placement']);
                  }
                  this.filtered = this.placeControl.valueChanges.pipe(
                    startWith(''),
                    map(value => this._filter(value))
                  );
                }
              });
              this.did.emit(e);
            }
          }
        });
      });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.places.filter(option => option.toLowerCase().includes(filterValue));
  }
  toggle(id){
    this.sIO.getTimeOut();
    this.devices.forEach(dev=>{
      if(dev['id'] === id) {
        this.device = dev;
      }
    });
    this.cdid = id;
    const e = {
      init: 'device',
      id: id,
      device: this.device
    };
    this.did.emit(e);
  }

  setQueryDevices(e){
    console.log(this.timeouts);
    let body: any[] = [];
    if(e === 'all') {
      this.devices.forEach(dev=>{
        const pos = this.timeouts.map(function(e) { return e.id; }).indexOf(dev.id);
        if(pos < 0) {
          body.push(dev);
        }
      });
    } else if(e==='list') {
      this.initDevices.forEach(dev=>{
        const pos = this.timeouts.map(function(e) { return e.id; }).indexOf(dev.id);
        if(pos < 0) {
          body.push(dev);
        }
      });
    }
    console.log(body);
    this.Query = '{"server_init": "getDevices", "company_id":' + this.cid+',"devices": '+
      JSON.stringify(body) +'}';
  }
  setPlace(e) {
    if(e !== '') {
      this.initDevices = this.devices.filter(dev=>dev['placement'].toLowerCase() === e.toLowerCase());
    } else {
      this.initDevices = this.devices
    }
  }

  sendQuery(e){
    this.setQueryDevices(e);
    console.log(this.Query);
    this.sIO.send_put(this.Query);
  }

}
