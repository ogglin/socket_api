import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Event} from "../../shared/socket/model/event";
import {ToJsonService} from "../../services/to-json.service";

@Component({
  selector: 'app-companyes',
  templateUrl: './companyes.component.html',
  styleUrls: ['./companyes.component.scss']
})
export class CompanyesComponent implements OnInit {

  @Input() uid: any;
  @Input() edit: string;
  @Output() cid = new EventEmitter<any>();
  filtered: Observable<string[]>;
  companyControl = new FormControl('');
  companies: any;
  ioConnection: any;
  result: any;
  changeLog: any[] = [];
  id: number = null;
  constructor(private sIO: SocketService, private json: ToJsonService) { }
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`)
    }
    // changes.prop contains the old and the new value...
  }
  ngOnInit() {
    this.sIO.getCompany(this.uid);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message=>{
        this.json.toJSON(message).subscribe(data=>{
          if(data['companies']) {
            this.companies = data['companies'];
            this.filtered = this.companyControl.valueChanges.pipe(
              startWith(''),
              map(value => this._filterCompany(value))
            );
          }
          if(data['putCompany']) {
            this.result = data['putCompany']['status'];
            if(this.result === 'success') {
              this.sIO.getCompany(this.uid);
            }
          }
        });
      });
  }
  private _filterCompany(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter(option => option['title'].toLowerCase().includes(filterValue));
  }

  toggle(id){
    const e = {
      init: 'company',
      id: id
    };
    this.cid.emit(e);
    this.id = id;
  }
  addCompany() {
    let body;
    if(this.id !== null) {
      body = {
        client_init: 'editCompany',
        title: this.companyControl.value,
        id: this.id
      };
    } else {
      body = {
        client_init: 'addCompany',
        title: this.companyControl.value,
        description: ''
      };
    }
    this.sIO.send_put(JSON.stringify(body));
  }
}
