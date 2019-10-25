import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  cuid: number = 0;
  clients: any[] = [];
  cid: number = 0;
  devices: any[] = [];
  device: any;
  isDevOn: number = 1;

  loginForm = new FormGroup({
    loginControl: new FormControl(''),
    passControl: new FormControl('')
  });

  constructor(private api: APIService, private router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem('logIn') === 'true') {
      this.isLogIn = true;
    }
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
    this.api.getDevices(this.cuid, this.cid, this.isDevOn).subscribe(result=>{
      this.devices = result;
      console.log(this.devices);
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
  logIn() {
    if (this.loginForm.controls['loginControl'].value === 'admin' && this.loginForm.controls['passControl'].value === 'q1w2e3r4t5y6') {
      this.isLogIn = true;
      localStorage.setItem('logIn', 'true');
    }
  }
  go(url) {
    switch (url) {
      case 'device': this.router.navigate(['/']); break;
    }
  }
}
