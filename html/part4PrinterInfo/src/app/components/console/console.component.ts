import { Component, OnInit } from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  messageContent: string;
  messages: any[] = [];
  ioConnection: any;
  isShow: boolean = false;
  constructor(private sIO: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.sIO.initSocket();
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message=>{
        this.messages.push('get'+message);
      });

    this.sIO.onPutMessage().subscribe(message=>{
      this.messages.push('put'+message);
    });
  }
  public sendMessage(message: string): void {
    if(!message) {
      return;
    }
    this.sIO.send( message );
    this.messageContent = null;
  }

}
