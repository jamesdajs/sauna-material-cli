import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';

import { SharedModule } from './shareds/shared.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [CookieService,
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorInterceptor,multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
