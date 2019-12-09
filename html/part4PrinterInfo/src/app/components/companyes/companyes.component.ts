import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-companyes',
  templateUrl: './companyes.component.html',
  styleUrls: ['./companyes.component.scss']
})
export class CompanyesComponent implements OnInit {

  @Input() uid: any;
  @Input() edit: string;
  @Input() companies: any;
  @Input() sIO: any;
  @Output() cid = new EventEmitter<any>();
  filtered: Observable<string[]>;
  companyControl = new FormControl('');
  result: any;
  changeLog: any[] = [];
  id: number = null;
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['companies']) {
      this.companies = changes['companies'].currentValue;
      this.filtered = this.companyControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCompany(value))
      );
    }
  }
  ngOnInit() {
    this.sIO.getCompany(this.uid);
  }

  private _filterCompany(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companies.filter(option => option['title'].toLowerCase().includes(filterValue));
  }

  toggle(id){
    const e = {
      init: 'company',
      id: id,
      title: this.companyControl.value
    };
    this.cid.emit(e);
    this.id = id;
  }

  addCompany(){
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
