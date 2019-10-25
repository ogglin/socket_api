import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevicesComponent} from "./devices/devices.component";
import {AdminComponent} from "./devices/admin/admin.component";


const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: '**', component: DevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
