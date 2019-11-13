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

  getCompany(uid): Observable<any[]> {
    return this.http.get<any>(this.url + 'company'+'?uid='+uid, this.httpOptions);
  }

  getClient(cuid): Observable<any[]> {
    const param = '?cuid='+cuid;
    return this.http.get<any>(this.url + 'client' + param, this.httpOptions);
  }

  getDevices(cuid, cid, on): Observable<any[]> {
    const param = "?cuid="+cuid+"&cid="+cid+"&on="+on;
    return this.http.get<any>(this.url + 'devices' + param, this.httpOptions);
  }

  getInfo(id): Observable<any[]> {
    const param = '?client='+id;
    return this.http.get<any>(this.url+'info'+param, this.httpOptions);
  }

  getErrors(did): Observable<any[]> {
    const param = "?did="+did;
    return this.http.get<any>(this.url + 'errors'+param, this.httpOptions);
  }

  getCSV(cuid, smonth, emonth): Observable<any[]> {
    const param = "?cuid="+cuid+"&smonth="+smonth+"&emonth="+emonth;
    return this.http.get<any>(this.url + 'cvs'+param, this.httpOptions);
  }

  addCompany(body): Observable<any[]> {
    return this.http.put<any>(this.url + 'company', body, this.httpOptions);
  }

  addClient(body): Observable<any[]> {
    return this.http.put<any>(this.url + 'client', body, this.httpOptions);
  }

  addDevice(body): Observable<any[]> {
    return this.http.put<any>(this.url + 'device', body, this.httpOptions);
  }

  editDevice(body): Observable<any[]> {
    return this.http.post<any>(this.url + 'device', body, this.httpOptions);
  }

  editCompany(body): Observable<any[]> {
    return this.http.post<any>(this.url + 'company', body, this.httpOptions);
  }

  editClient(body): Observable<any[]> {
    return this.http.post<any>(this.url + 'client', body, this.httpOptions);
  }

  authLogin(login, pass): Observable<any[]> {
    const param = "?login="+login+"&pass="+pass;
    return this.http.get<any>(this.url + 'auth' + param, this.httpOptions);
  }
}
