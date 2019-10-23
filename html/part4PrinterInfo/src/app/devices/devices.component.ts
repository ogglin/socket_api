import { Component, OnInit } from '@angular/core';
import {APIService} from './shared/services/api.service';
import {Customers} from './shared/model/api';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

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
  devId: number;
  dates: any[] = [];
  dataLI: number = 0;
  devLI: number = 0;

  constructor(private api: APIService) { }

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
    this.api.getCustomers().subscribe(result=>{
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
    this.api.getDevices(this.cuid, this.cid).subscribe(result=>{
      this.devices = result;
      console.log(this.devices);
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
      }
    });
  }
  toggleActive(i, t) {
    switch (t) {
      case 'data':this.dataLI = i; break;
      case 'dev':this.devLI = i; break
    }

  }
}
