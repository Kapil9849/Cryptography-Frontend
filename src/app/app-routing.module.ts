import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserlandingComponent } from './login/userlanding/userlanding.component';
import { AdminlandingComponent } from './login/adminlanding/adminlanding.component';
import { ViewfileComponent } from './viewfile/viewfile.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "userlanding",
    component: UserlandingComponent
  },
  {
    path: "adminlanding",
    component: AdminlandingComponent
  },
  {
    path: "viewfile/:file_name",
    component: ViewfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
