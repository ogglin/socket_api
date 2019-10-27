import { Component, OnInit } from '@angular/core';
import {APIService} from './shared/services/api.service';
import {Customers} from './shared/model/api';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  customerControl = new FormControl();
  customers: any[] = [];
  filteredCustomers: Observable<string[]>;
  cuid: number = 0;
  clients: any[] = [];
  cid: number = 0;
  infos: any[] = [];
  infoUrl: string = '';
  infoDate: any;
  devices: any[] = [];
  device: any;
  initDevices: any[] = [];
  devId: number;
  dates: any[] = [];
  dataLI: number = 0;
  devLI: number = 0;
  getQuery: string;

  constructor(private api: APIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomer();
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );
  }

  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(option => option['title'].toLowerCase().includes(filterValue));
  }

  getCustomer() {
    this.api.getCompany().subscribe(result=>{
      this.customers = result;
    });
  }
  getClient() {
    this.api.getClient(this.cuid).subscribe(result=>{
      this.clients = result;
    });
  }
  getDevices() {
    this.devices = [];
    this.initDevices = [];
    this.api.getDevices(this.cuid, this.cid, 1).subscribe(result=>{
      this.devices = result;
      console.log(this.devices);
      this.devices.forEach(item=>{
        this.initDevices.push({
          productName: item['productname'],
          url: item['url'],
          serialNumber: item['sn'],
          device_id: item['id']
        });
      });
      this.getQuery = '{"server_init": "getInfo", "init_company":' + this.cuid+',"init_client": '+this.cid+',"devices": '+
       JSON.stringify(this.initDevices) +'}';
      console.log(this.getQuery);
    });
  }
  getInfo() {
    this.dates = [];
    this.api.getInfo(this.devId).subscribe(result=>{
      this.infos = result['content'];
      console.log(this.infos);
      this.infos.forEach(item=>{
        this.dates.push(item['datetime']);
      });
    });
  }

  setCustomer(id) {
    this.cuid = id;
    this.getClient();
  }

  setClient(id) {
    this.cid = id;
    this.getDevices();
  }

  setInfo(id){
    this.devId = id;
    this.getInfo();
  }
  setDate(date) {
    this.infoDate = date;
    this.infos.forEach(info => {
      if(info['datetime'] === date){
        this.device = info;
        console.log(this.device);
      }
    });
  }
  toggleActive(i, t) {
    switch (t) {
      case 'data':this.dataLI = i; break;
      case 'dev':this.devLI = i; break
    }

  }
  go(url) {
    switch (url) {
      case 'admin': this.router.navigate(['/admin']); break;
    }
  }
}
