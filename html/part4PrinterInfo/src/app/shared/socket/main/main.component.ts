import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {Event} from '../model/event'
import {Action} from "../model/action";
import {Message} from "../model/message";
import {User} from '../model/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  action = Action;
  user: User;
  ioConnection: any;
  isLogin: boolean = false;
  uid:number = null;
  cid:number = null;
  oid: number = null;
  did: number = null;
  office: string;
  device: any;
  isEdit: string = 'false';
  interval: any;
  companyName: string = '';
  timeouts: any[] = [];
  constructor(private sIO: SocketService) { }

  ngOnInit() {
    if(localStorage.getItem('login') === 'true' && localStorage.getItem('uid')) {
      this.isLogin = true;
      this.uid = parseInt(localStorage.getItem('uid'), 10);
    } else {
      this.isLogin = false;
    }
    if(this.uid === 0 && localStorage.getItem('isEdit')) {
      this.isEdit = localStorage.getItem('isEdit');
    }
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.sIO.initSocket();
    this.sIO.onEvent(Event.CONNECT)
      .subscribe((e) => {
        console.log(e, 'connected');
      });
    this.sIO.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendNotification(params: any, action: Action){
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.sIO.send(message);
  };

  setId(e) {
    switch (e.init) {
      case "company": this.cid = null; this.oid = null; this.did = null; this.companyName = e.title; setTimeout(()=>{this.cid = e.id}, 10); break;
      case "office": this.oid = null; this.did = null; setTimeout(()=>{this.oid = e.id; this.office = e.office}, 10); break;
      case "device": this.did = null; setTimeout(()=>{this.did = e.id; this.device = e.device}, 10); break;
    }
  }
  go(url){
    switch (url) {
      case 'edit': this.isEdit = 'true'; localStorage.setItem('isEdit', 'true'); break;
      case 'view': this.isEdit = 'false'; localStorage.setItem('isEdit', 'false'); break;
    }
  }
  LogIn(e){
    if(e.check) {
      this.isLogin = true;
      this.cid = e.id;
      this.uid = e.id;
      localStorage.setItem('login', 'true');
      localStorage.setItem('uid', this.uid.toString());
    }
  }
  logOut() {
    localStorage.removeItem('login');
    localStorage.removeItem('uid');
    this.isLogin = false;
  }
  setTimeout(e) {
    this.timeouts = e;
  }
}
