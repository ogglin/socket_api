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
  dates: any[] = [];

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
      console.log(this.clients);
    });
  }

  getInfo() {
    this.api.getInfo(this.cid).subscribe(result=>{
      this.infos = result['content'];
      let url = [];
      this.infos.forEach(info => {
        if(url.indexOf(info['url']) < 0) {
          url.push(info['url']);
          this.devices.push({
            title: info['productname'],
            url: info['url'],
            sn: info['serialnumber']
          })
        }
      });
      console.log(this.devices);
    });
  }

  setCustomer(id) {
    this.cuid = id;
    this.getClient();
  }

  setClient(id) {
    this.cid = id;
    this.getInfo();
  }

  setInfo(url){
    this.infoUrl = url;
    this.dates = [];
    this.infos.forEach(info => {
      if(info['url'] === url){
        this.dates.push(info['datetime'])
      }
    });
    this.infoDate = null;
  }
  setDate(date) {
    this.infoDate = date;
  }

}
