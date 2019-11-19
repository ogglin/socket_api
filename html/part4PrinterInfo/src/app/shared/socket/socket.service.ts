import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {Address} from '../../devices/shared/model/address';
import {Client} from '../../devices/shared/model/client';
import {Customers} from '../../devices/shared/model/customers';
import {Info} from '../../devices/shared/model/info';
import {Event} from './model/event';

import io from 'socket.io-client';

/*const SERVER_URL_GET = 'https://localhost:443/get';
const SERVER_URL_PUT = 'https://localhost:443/put';*/
const SERVER_URL_GET = 'https://socket.api.part4.info:8443/get';
const SERVER_URL_PUT = 'https://socket.api.part4.info:8443/put';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _put;
  private _get;

  public initSocket(): void {
    this._put = io(SERVER_URL_PUT);
    this._get = io(SERVER_URL_GET);
  }

  public send(message: any): void {
    this._put.emit('message', message);
  }

  public send_get(msg: any): void {
    this._get.emit('get', msg);
  }

  public send_put(msg: any): void {
    this._put.emit('put', msg);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this._get.on('get', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<any>(observer => {
      this._put.on(event, () => observer.next('_put'));
      this._get.on(event, () => observer.next('_get'));
    });
  }

  public getCompany(uid: number): void {
      this._get.emit('get', '{"getCompany":'+uid+'}');
  }
  public getOffice(cid: number): void {
    this._get.emit('get', '{"getOffice":'+cid+'}');
  }
  public getDevices(cid: number, oid: number, did: number): void {
    this._get.emit('get', '{"getDevices":'+did+',"cid":'+cid+',"oid":'+oid+'}');
  }
  public getInfos(did): void {
    this._get.emit('get', '{"getinfo":'+did+'}');
  }
  public getCSV(cid: number, smonth, emonth): void {
    this._get.emit('get', '{"getCSV":'+cid+',"smonth":'+smonth+',"emonth":'+emonth+'}');
  }

  constructor() { }
}
