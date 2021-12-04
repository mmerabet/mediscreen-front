import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {AppRoutingModule} from "./app-routing.module";
import {DefaultModule} from "./layouts/default/default.module";
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
