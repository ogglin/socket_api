import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SocketService} from "../../shared/socket/socket.service";
import {ToJsonService} from "../../services/to-json.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  @Input() cid: number;
  @Input() interval: object;
  csvData: any[] = [];
  ioConnection: any;
  changeLog: any[] = [];

  constructor(private sIO: SocketService, private json: ToJsonService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`)
    }
    this.sIO.getCSV(this.cid, this.interval['start'], this.interval['end']);
  }

  ngOnInit() {
    this.sIO.getCSV(this.cid, this.interval['start'], this.interval['end']);
    this.ioConnection = this.sIO.onMessage()
      .subscribe(message => {
        this.json.toJSON(message).subscribe(data => {
          if (data['getCSV']) {
            this.csvData = [];
            data['getCSV'].forEach(item => {
              let data = new Date(item['datetime']);
              this.csvData.push({
                company: item['company'],
                office: item['office'],
                product: item['productname'],
                sn: item['sn'],
                article: item['article'],
                client_article: item['client_article'],
                data: data.toLocaleDateString('ru-RU'),
                printcycles: item['printcycles']
              });
            })
          }
        });
      });
  }

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    csv.unshift(header.join(';'));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv;charset=utf-8'}),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "Export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
