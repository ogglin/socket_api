import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevicesComponent} from "./devices/devices.component";
import {AdminComponent} from "./devices/admin/admin.component";
import {MainComponent} from "./shared/socket/main/main.component";


const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'main', component: MainComponent},
  {path: '**', component: DevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
