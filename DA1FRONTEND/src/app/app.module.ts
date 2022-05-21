import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { CommonModule } from '@angular/common';  
import {HttpClientModule} from '@angular/common/http' 
import { ApiserviceService } from './apiservice.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component'
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    LoginSignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
