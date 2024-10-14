import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { LoginService } from './login/login.service';
import { UserlandingComponent } from './login/userlanding/userlanding.component';
import { AdminlandingComponent } from './login/adminlanding/adminlanding.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ViewfileComponent } from './viewfile/viewfile.component';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserlandingComponent,
    AdminlandingComponent,
    ViewfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    ToastModule,
    AccordionModule,
    TabViewModule
  ],
  providers: [LoginService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
