import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {APIService} from "../shared/services/api.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isLogIn: boolean = false;
  login: 'admin';
  pass: 'q1w2e3r4t5y6';
  customerControl = new FormControl();
  customers: any[] = [];
  filteredCustomers: Observable<string[]>;
  deviceControl = new FormControl();
  filteredDevice: Observable<any[]>;
  fdevices: any[] = [];
  devices: any[] = [];
  cuid: number = 0;
  clients: any[] = [];
  cid: number = 0;
  device: any;
  isDevOn: number = 1;
  reqCompany: any;
  reqClient: any;
  reqDevice: any;
  did: number;
  saveCompany: boolean = false;
  saveClient: boolean = false;
  initDevices: any[] = [];
  getQuery: string;
  uid: number;

  loginForm = new FormGroup({
    loginControl: new FormControl(''),
    passControl: new FormControl('')
  });

  companyForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('')
  });

  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  deviceForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    article: new FormControl(''),
    placement: new FormControl(''),
    serialNumber: new FormControl('', [Validators.required]),
    enabled: new FormControl(true)
  });

  constructor(private api: APIService, private router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem('login') === 'true') {
      this.isLogIn = true;
      this.cuid = parseInt(localStorage.getItem('uid'), 10);
      this.uid = parseInt(localStorage.getItem('uid'), 10);
    }
    this.getCustomer();
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );
    this.filteredDevice = this.deviceControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDevice(value))
    );
  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(option => option['title'].toLowerCase().includes(filterValue));
  }
  private _filterDevice(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.devices.filter(option => option['placement'].toLowerCase().includes(filterValue)).filter(option => option['placement'] !== ' ');
  }
  getCustomer() {
    this.api.getCompany(this.cuid).subscribe(result=>{
      this.customers = result;
      if(this.uid !== 0) {
        this.customerControl.setValue(result[0]['title']);
      }
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
    this.api.getDevices(this.cuid, this.cid, this.isDevOn).subscribe(result=>{
      this.devices = result;
      console.log(this.devices);
      this.fdevices = this.devices;
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

  addCompany(){
    if(this.saveCompany) {
      const body = {
        title: this.companyForm.controls['title'].value,
        id: this.cuid
      };
      this.api.editCompany(body).subscribe(result=>{
        this.reqCompany = result;
        if(result['status'] === 'success') {
          this.getCustomer();
        }
      });
    } else {
      const body = {
        title: this.companyForm.controls['title'].value,
        desc: this.companyForm.controls['desc'].value
      };
      this.api.addCompany(body).subscribe(result=>{
        this.reqCompany = result;
        if(result['status'] === 'success') {
          this.getCustomer();
        }
      });
    }
  }

  addClient(){
    if(this.saveClient) {
      const body = {
        name: this.clientForm.controls['name'].value,
        id: this.cid
      };
      this.api.editClient(body).subscribe(result=>{
        console.log(result);
        this.reqClient = result;
        if(result['status'] === 'success') {
          this.getClient();
        }
      });
    } else {
      const body = {
        name: this.clientForm.controls['name'].value,
        customers_id: this.cuid
      };
      this.api.addClient(body).subscribe(result=>{
        console.log(result);
        this.reqClient = result;
        if(result['status'] === 'success') {
          this.getClient();
        }
      });
    }
  }

  addDevice(){
    const body = {
      productName: this.deviceForm.controls['productName'].value,
      url: this.deviceForm.controls['url'].value,
      init_client: this.cid,
      company_id: this.cuid,
      article: this.deviceForm.controls['article'].value,
      placement: this.deviceControl.value,
      serialNumber: this.deviceForm.controls['serialNumber'].value,
      enable: 1
    };
    this.api.addDevice(body).subscribe(result=>{
      this.reqDevice = result;
      if(result['status'] === 'success') {
        this.getDevices();
      }
    });
  }

  editDevice(){
    let enable = 1;
    if(this.deviceForm.controls['enabled'].value) {
      enable = 1;
    } else {
      enable = 0;
    }
    const body = {
      id: this.did,
      productName: this.deviceForm.controls['productName'].value,
      url: this.deviceForm.controls['url'].value,
      init_client: this.cid,
      company_id: this.cuid,
      article: this.deviceForm.controls['article'].value,
      placement: this.deviceForm.controls['placement'].value,
      serialNumber: this.deviceForm.controls['serialNumber'].value,
      enable: enable
    };
    this.api.editDevice(body).subscribe(result=>{
      this.reqDevice = result;
      if(result['status'] === 'success') {
        this.getDevices();
      }
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

  setCompany(id) {
    if(id !== 0) {
      this.customers.forEach(item=>{
        if(item['id'] === id) {
          this.companyForm.controls['title'].setValue(item['title']);
          this.saveCompany = true;
        }
      });
    } else {
      this.companyForm.controls['title'].setValue('');
      this.saveCompany = false;
    }
  }

  setClients(id) {
    if(id !== 0) {
      this.clients.forEach(item=>{
        if(item['id'] === id) {
          this.clientForm.controls['name'].setValue(item['name']);
          this.saveClient = true;
        }
      });
    } else {
      this.clientForm.controls['name'].setValue('');
      this.saveClient = false;
    }
  }
  setDevices(e){
    if(e === '') {
      this.fdevices = this.devices;
      this.deviceControl.setValue('');
    } else {
      this.fdevices = this.devices.filter(item => item['placement'] === e);
    }
    console.log(this.fdevices);
  }
  setDevice(id){
    if(id !== 0) {
      this.devices.forEach(item=>{
        if(item['id'] === id) {
          this.device = item;
          this.deviceForm.controls['productName'].setValue(item['productname']);
          this.deviceForm.controls['url'].setValue(item['url']);
          this.deviceForm.controls['article'].setValue(item['article']);
          this.deviceControl.setValue(item['placement']);
          this.deviceForm.controls['serialNumber'].setValue(item['sn']);
          if(item['enabled'] === 1) {
            this.deviceForm.controls['enabled'].setValue(true);
          } else {
            this.deviceForm.controls['enabled'].setValue(false);
          }
          this.did = id;
          console.log(this.device);
        }
      });
    } else {
      this.did = null;
      this.deviceForm.controls['productName'].setValue('');
      this.deviceForm.controls['url'].setValue('');
      this.deviceForm.controls['article'].setValue('');
      this.deviceForm.controls['placement'].setValue('');
      this.deviceForm.controls['serialNumber'].setValue('');
    }
  }

  edit(i, id) {
    switch (i) {
      case 'device': this.setDevice(id); break;
      case 'company': this.setCompany(id); break;
      case 'client': this.setClients(id); break;
    }
  }
  clear(i) {
    switch (i) {
      case "device": this.setDevice(0); break;
      case 'company': this.setCompany(0); break;
      case 'client': this.setClients(0); break;
    }
  }
  logIn() {
    if (this.loginForm.controls['loginControl'].value === 'admin' && this.loginForm.controls['passControl'].value === 'q1w2e3r4t5y6') {
      this.isLogIn = true;
      localStorage.setItem('logIn', 'true');
    }
  }
  go(url) {
    switch (url) {
      case 'device': this.router.navigate(['/']); break;
      case 'device_exit': localStorage.removeItem('logIn'); localStorage.removeItem('uid');; this.router.navigate(['/']); break;
    }
  }

  toggle(){
    if(this.isDevOn === 0) {
      this.isDevOn = 1; this.getDevices(); return;
    }
    if (this.isDevOn === 1) {
      this.isDevOn = 0; this.getDevices(); return;
    }
  }
}
