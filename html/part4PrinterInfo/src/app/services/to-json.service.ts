import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToJsonService {

  constructor() { }

  public toJSON(message): Observable<any> {
    return new Observable(observer => {
      if (/^[\],:{}\s]*$/.test(message.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        observer.next(JSON.parse(message));
      } else {
        observer.next(message);
      }
    });
  }
}
