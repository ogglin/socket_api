import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from "@angular/common/http";
import { CompanyComponent } from '../devices/admin/company/company.component';
import { ClientComponent } from '../devices/admin/client/client.component';
import { DeviceComponent } from '../devices/admin/device/device.component';
import { ManageComponent } from '../devices/admin/manage/manage.component';
import { AdminComponent } from '../devices/admin/admin.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgScrollbarModule} from "ngx-scrollbar";


@NgModule({
  declarations: [CompanyComponent, ClientComponent, DeviceComponent, ManageComponent, AdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgScrollbarModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    NgScrollbarModule
  ]
})
export class SharedModule { }
