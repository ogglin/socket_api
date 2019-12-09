import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ToJsonService} from "../../services/to-json.service";
import {ToXlsxService} from "../../services/to-xlsx.service";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  @Input() cid: number;
  @Input() title: string;
  @Input() sIO: any;
  @Input() interval: object;
  csvData: any[] = [];
  ioConnection: any;
  changeLog: any[] = [];

  constructor( private json: ToJsonService, private excel: ToXlsxService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sIO.getCSV(this.cid, this.interval['start'], this.interval['end']);
  }

  ngOnInit() {
    this.sIO.getCSV(this.cid, this.interval['start'], this.interval['end']);
    this.sIO.onMessage()
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

  exportAsXLSX():void {
    this.excel.exportAsExcelFile(this.csvData, this.title);
  }
}
