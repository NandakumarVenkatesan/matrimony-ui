import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouteReuseStrategy} from "@angular/router";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";
import {CoreService} from "./core/services/core.service";
import {ToastService} from "./core/services/toast.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    CoreService, ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
