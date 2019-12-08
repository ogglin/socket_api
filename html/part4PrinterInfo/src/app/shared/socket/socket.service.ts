import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Event} from './model/event';

import io from 'socket.io-client';

/*const SERVER_URL_GET = 'https://localhost:8443/get';
const SERVER_URL_PUT = 'https://localhost:8443/put';*/
/*const SERVER_URL_GET = 'https://socket.api.part4.info:8443/get';
const SERVER_URL_PUT = 'https://socket.api.part4.info:8443/put';*/
const SERVER_URL_GET = 'https://dev.socket.part4.info:8443/get';
const SERVER_URL_PUT = 'https://dev.socket.part4.info:8443/put';

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

  public onPutMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this._put.on('get', (data: any) => observer.next(data));
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
  public getDevices(cid: number, oid: number, did: number, on: number): void {
    this._get.emit('get', '{"getDevices":'+did+',"cid":'+cid+',"oid":'+oid+',"on":'+on+'}');
  }
  public getInfos(did, start, end): void {
    this._get.emit('get', '{"getinfo":'+did+',"start":"'+start+'","end":"'+end+'"}');
  }
  public getCSV(cid: number, start, end): void {
    this._get.emit('get', '{"getCSV":'+cid+',"start":"'+start+'","end":"'+end+'"}');
  }
  public getTimeOut(): void {
    this._get.emit('get', '{"deviceIds":"1"}');
  }
  constructor() { }
}
