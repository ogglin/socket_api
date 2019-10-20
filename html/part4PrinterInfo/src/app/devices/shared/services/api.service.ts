import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from "@angular/common/http";

interface Customers {
  id?: number,
  title: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  url = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {

  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any>(this.url + 'company', this.httpOptions);
  }

  getClient(cuid): Observable<any[]> {
    const param = '?cuid='+cuid;
    return this.http.get<any>(this.url + 'client' + param, this.httpOptions);
  }

  getInfo(id): Observable<any[]> {
    const param = '?client='+id;
    return this.http.get<any>(this.url+'info'+param, this.httpOptions);
  }
}
