import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {SocketService} from "../../shared/socket/socket.service";
import {Event} from "../../shared/socket/model/event";
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
  @Output() oid = new EventEmitter<any>();
  filtered: Observable<string[]>;
  officeControl = new FormControl('');
  offices: any;
  id: number;
  result: any;
  ioConnection: any;
  constructor(private sIO: SocketService, private json: ToJsonService) { }

  ngOnInit() {
    this.sIO.getOffice(this.cid);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message=>{
        this.json.toJSON(message).subscribe(data=>{
          if(data['offices']) {
            this.offices = data['offices'];
            if(this.offices.length === 1) {
              this.officeControl.setValue(this.offices[0]['name']);
              const e = {
                init: 'office',
                id: this.offices[0]['id']
              };
              this.id = this.offices[0]['id'];
              this.oid.emit(e);
            }
            this.filtered = this.officeControl.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(value))
            );
          }
          if(data['putOffice']) {
            this.result = data['putOffice']['status'];
            if(this.result === 'success') {
              this.sIO.getOffice(this.cid);
            }
          }
        });
      });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.offices.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  toggle(id){
    const e = {
      init: 'office',
      id: id
    };
    this.oid.emit(e);
    this.id = id;
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
