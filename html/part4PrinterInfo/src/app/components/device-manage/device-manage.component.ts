import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {ToJsonService} from "../../services/to-json.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})
export class DeviceManageComponent implements OnInit {

  @Input() cid: number;
  @Input() oid: number;
  @Input() edit: boolean;
  devices: any[] = [];
  device: any;
  initDevices: any[] = [];
  places: any[] = [];
  selected = 'Все';
  result: any;
  id: number;
  ioConnection: any;
  deviceForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    article: new FormControl(''),
    placement: new FormControl(''),
    serialNumber: new FormControl(''),
    enabled: new FormControl(false)
  });

  constructor(private sIO: SocketService, private json: ToJsonService) {
  }

  ngOnInit() {
    this.sIO.getDevices(this.cid, this.oid, 1, 1);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message => {
        this.json.toJSON(message).subscribe(data => {
          if (data['devices']) {
            this.devices = data['devices'];
            console.log(this.devices);
            if (this.devices.length > 0) {
              this.device = this.devices[0];
              this.initDevices = this.devices;
              this.devices.forEach(dev=>{
                if(this.places.indexOf(dev['placement']) < 0 && dev['placement'] !== ' ') {
                  this.places.push(dev['placement']);
                }
              });
            }
          }
          if(data['putDevice']) {
            this.result = data['putDevice']['status'];
            if(this.result === 'success') {
              this.sIO.getDevices(this.cid, this.oid, 1, 1);
            }
          }
        });
      });
  }

  setPlace(e) {
    if(e !== '') {
      this.initDevices = this.devices.filter(dev=>dev['placement'].toLowerCase() === e.toLowerCase());
    } else {
      this.initDevices = this.devices
    }
  }
  init(id, e){
    this.result = null;
    this.id = id;
    const dev = this.initDevices.filter(d=>d['id']===id)[0];
    this.deviceForm.controls['productName'].setValue(dev['productname']);
    this.deviceForm.controls['url'].setValue(dev['url']);
    this.deviceForm.controls['article'].setValue(dev['article']);
    this.deviceForm.controls['placement'].setValue(dev['placement']);
    this.deviceForm.controls['serialNumber'].setValue(dev['sn']);
    this.deviceForm.controls['enabled'].setValue(dev['enabled']);
    if(dev['enabled'] === 1) {
      this.deviceForm.controls['enabled'].setValue(true);
    } else {
      this.deviceForm.controls['enabled'].setValue(false);
    }
  }
  clear(){
    this.result = null;
    this.id = null;
    this.deviceForm.controls['productName'].setValue('');
    this.deviceForm.controls['url'].setValue('');
    this.deviceForm.controls['article'].setValue('');
    this.deviceForm.controls['placement'].setValue('');
    this.deviceForm.controls['serialNumber'].setValue('');
  }

  saveDevice() {
    let body;
    let en;
    if(this.deviceForm.controls['enabled'].value) {
      en = 1;
    } else {
      en = 0
    }
    if (this.id) {
      body = {
        id: this.id,
        client_init: 'editDevice',
        oid: this.oid,
        cid: this.cid,
        productName: this.deviceForm.controls['productName'].value,
        url: this.deviceForm.controls['url'].value,
        article: this.deviceForm.controls['article'].value,
        placement: this.deviceForm.controls['placement'].value,
        serialNumber: this.deviceForm.controls['serialNumber'].value,
        enable: en
      };
    } else {
      body = {
        client_init: 'addDevice',
        oid: this.oid,
        cid: this.cid,
        productName: this.deviceForm.controls['productName'].value,
        url: this.deviceForm.controls['url'].value,
        article: this.deviceForm.controls['article'].value,
        placement: this.deviceForm.controls['placement'].value,
        serialNumber: this.deviceForm.controls['serialNumber'].value,
        enable: en
      };
    }
    console.log(body);
    setTimeout(()=>this.clear(),50);
    this.sIO.send_put(JSON.stringify(body));
  }
}
