import { Injectable } from '@angular/core';
import {AsyncSubject, Observable} from "rxjs";
import {SocketService} from "../shared/socket/socket.service";
import {ToJsonService} from "./to-json.service";

@Injectable({
  providedIn: 'root'
})
export class TimeoutsService {

  devices: any[] = [];
  res: any[] = [];
  private asyncSubject = new AsyncSubject();
  constructor(private json: ToJsonService, private sIO: SocketService) {
    this.sIO.onMessage().subscribe(message=>{
      this.json.toJSON(message).subscribe(data => {
        this.res = data['deviceTimeout'];
        console.log(this.res);
      });
    });
    console.log(this.res);
  }

  public timeout(dids): Observable<any> {
    let body = [];
    dids.forEach(did=>{
      body.push({id: did})
    });
    this.sIO.getTimeOut();
    this.asyncSubject.next(this.res);
    if(this.res.length > 0) {
      this.asyncSubject.complete();
    }
    return this.asyncSubject.asObservable();
  }
}
