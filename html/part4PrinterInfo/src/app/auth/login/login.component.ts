import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {APIService} from "../../devices/shared/services/api.service";
import {SocketService} from "../../shared/socket/socket.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    loginControl: new FormControl(''),
    passControl: new FormControl('')
  });
  @Input() sIO: any;
  @Output() check = new EventEmitter<any>();
  error: string = '';
  ioConnection: any;

  constructor() {
  }

  ngOnInit() {
    this.sIO.onMessage()
      .subscribe(message => {
        let data: JSON;
        if (/^[\],:{}\s]*$/.test(message.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
          data = JSON.parse(message);
          if (data['auth']) {
            console.log(data['auth']['status']);
            if(data['auth']['status'] === 'success' && data['auth']['result'].length) {
              this.check.emit({
                  'id': data['auth']['result'][0]['company_id'],
                  'check': true
                }
              )
            } else {
              this.check.emit({
                  'id': null,
                  'check': false
                }
              )
            }
          }
        }
      });
  }

  logIn() {
    const login = this.loginForm.controls.loginControl.value;
    const pass = this.loginForm.controls.passControl.value;
    const msg = '{"auth":{"login": "' + login + '", "pass": "' + pass + '"}}';
    this.sIO.send_get(msg);
  }

}
