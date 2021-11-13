import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from "@angular/material/button";
import {DefaultModule} from "./layouts/default/default.module";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,



    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    MatSliderModule,
    MatButtonModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
