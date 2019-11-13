import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {APIService} from "../../devices/shared/services/api.service";

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
  @Output() check = new EventEmitter<any>();
  error: string = '';
  constructor(private api: APIService) { }

  ngOnInit() {
  }

  logIn(){
    const login = this.loginForm.controls.loginControl.value;
    const pass = this.loginForm.controls.passControl.value;
    this.api.authLogin(login,pass).subscribe(result=>{
      let c;
      if (result['status'] === 'success' && result['result'].length > 0) {
        c = {
          id: result['result'][0]['company_id'],
          check: true
        };
      } else {
        c = {
          id: -1,
          check: false,
        };
        this.error = 'Не верный логин или пароль';
      }
      this.check.emit(c);
    });

  }

}
