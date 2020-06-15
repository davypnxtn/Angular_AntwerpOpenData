import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaadpalenService } from 'src/Services/laadpalen.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [LaadpalenService],
  bootstrap: [AppComponent]
})
export class AppModule { }

