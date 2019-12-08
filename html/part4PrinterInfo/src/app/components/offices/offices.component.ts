import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {SocketService} from "../../shared/socket/socket.service";
import {map, startWith} from "rxjs/operators";
import {ToJsonService} from "../../services/to-json.service";

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {

  @Input() cid: number;
  @Input() edit: string;
  @Input() offices: any;
  @Input() sIO: any;
  @Output() oid = new EventEmitter<any>();
  filtered: Observable<string[]>;
  officeControl = new FormControl('');
  id: number;
  office: string;
  ioConnection: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.offices = changes['offices'].currentValue;
    if(this.offices.length === 1) {
      this.officeControl.setValue(this.offices[0]['name']);
      const e = {
        init: 'office',
        id: this.offices[0]['id'],
        office: this.offices[0]['name']
      };
      this.office = this.offices[0]['name'];
      this.id = this.offices[0]['id'];
      this.oid.emit(e);
    }
    this.filtered = this.officeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.offices.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  toggle(id, name){
    const e = {
      init: 'office',
      id: id,
      office: this.officeControl.value
    };
    this.oid.emit(e);
    this.id = id;
    this.office = name;
  }

  saveOffice() {
    let body;
    if(this.id) {
      body = {
        client_init: 'editOffice',
        id: this.id,
        name: this.officeControl.value
      }
    } else {
      body = {
        client_init: 'addOffice',
        cid: this.cid,
        name: this.officeControl.value
      }
    }
    this.sIO.send_put(JSON.stringify(body));
  }
}
