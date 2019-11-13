import { Component, OnInit } from '@angular/core';
import {APIService} from './shared/services/api.service';
import {Customers} from './shared/model/api';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import { saveAs } from "file-saver";

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
  client: any;
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
  csvData: any[] = [];
  csvReady: boolean = false;
  isLogin: boolean = false;
  uid: number;

  constructor(private api: APIService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem('login') === 'true' && localStorage.getItem('uid')) {
      this.isLogin = true;
      this.uid = parseInt(localStorage.getItem('uid'), 10);
      this.cuid = this.uid;
    }
    if (this.isLogin) {
      this.getCustomer();
    }
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );
  }

  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(option => option['title'].toLowerCase().includes(filterValue));
  }
  LogIn(e){
    if(e.check) {
      this.isLogin = true;
      this.cuid = e.id;
      this.uid = e.id;
      this.getCustomer();
      localStorage.setItem('login', 'true');
      localStorage.setItem('uid', this.uid.toString());
    }
  }
  logOut() {
    localStorage.removeItem('login');
    localStorage.removeItem('uid');
    this.isLogin = false;
  }
  getCSV() {
    this.api.getCSV(this.cuid, 1, 0).subscribe(result=>{
      console.log(result);
      result.forEach(item=>{
        let data = new Date(item['datetime']);
        this.csvData.push({
          company: item['company'],
          office: item['office'],
          product: item['productname'],
          sn: item['sn'],
          article: item['article'],
          client_article: item['client_article'],
          data: data.toLocaleDateString('ru-RU'),
          printcycles: item['printcycles']
        });
      });
      console.log(this.csvData);
      this.csvReady = true;
    });
  }
  getCustomer() {
    this.api.getCompany(this.uid).subscribe(result=>{
      console.log(result);
      this.customers = result;
      if (this.uid !== 0) {
        this.customerControl.setValue(result[0]['title']);
        this.setCustomer(this.cuid);
      }
    });
  }
  getClient() {
    this.api.getClient(this.cuid).subscribe(result=>{
      this.clients = result;
      if(this.clients.length){
        this.client = this.clients[0]['name'];
        this.setClient(this.clients[0]['id']);
      }
    });
  }
  getDevices() {
    this.devices = [];
    this.initDevices = [];
    this.api.getDevices(this.cuid, this.cid, 1).subscribe(result=>{
      this.devices = result;
      if(this.devices.length) {
        this.setInfo(this.devices[0]['id']);
      }
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
    });
  }
  getInfo() {
    this.dates = [];
    this.api.getInfo(this.devId).subscribe(result=>{
      this.infos = result['content'];
      console.log(result);
      if (this.infos.length) {
        this.infos.forEach(item=>{
          this.dates.push(item['datetime']);
        });
        this.setDate(this.infos[0]['datetime']);
      }
    });
  }

  setCustomer(id) {
    this.cuid = id;
    this.getClient();
    this.getCSV();
  }
  setClient(id) {
    this.cid = id;
    this.getDevices();
  }
  setInfo(id){
    console.log(id);
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

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv;charset=utf-8' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
