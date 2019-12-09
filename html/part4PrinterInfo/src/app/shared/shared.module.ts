import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from "@angular/common/http";
import { CompanyComponent } from '../devices/admin/company/company.component';
import { ClientComponent } from '../devices/admin/client/client.component';
import { DeviceComponent } from '../devices/admin/device/device.component';
import { ManageComponent } from '../devices/admin/manage/manage.component';
import { AdminComponent } from '../devices/admin/admin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgScrollbarModule} from "ngx-scrollbar";
import { LoginComponent } from '../auth/login/login.component';
import { MainComponent } from './socket/main/main.component';
import { CompanyesComponent } from '../components/companyes/companyes.component';
import { OfficesComponent } from '../components/offices/offices.component';
import { DevicesComponent } from '../components/devices/devices.component';
import { InfoComponent } from '../components/info/info.component';
import { ExportComponent } from '../components/export/export.component';
import { DeviceManageComponent } from '../components/device-manage/device-manage.component';
import { DateIntervalComponent } from '../components/date-interval/date-interval.component';
import { ConsoleComponent } from '../components/console/console.component';
import { TimeoutsComponent } from '../components/timeouts/timeouts.component';
import {NgxSpinnersModule} from "ngx-spinners";

@NgModule({
  declarations: [CompanyComponent, ClientComponent, DeviceComponent, ManageComponent, AdminComponent, LoginComponent, MainComponent, CompanyesComponent, OfficesComponent, DevicesComponent, InfoComponent, ExportComponent, DeviceManageComponent, DateIntervalComponent, ConsoleComponent, TimeoutsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgxSpinnersModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    NgScrollbarModule,
    NgxSpinnersModule,
    LoginComponent
  ]
})
export class SharedModule { }
