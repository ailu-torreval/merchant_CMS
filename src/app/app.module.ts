import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MerchantScript } from './myScripts/MerchantScript';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { Http } from './myScripts/Http';
import { SkScript } from './myScripts/SkScript';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, FormsModule, ReactiveFormsModule, HttpClientModule, ComponentsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MerchantScript, LocationService, Http, SkScript],
  bootstrap: [AppComponent],
})
export class AppModule {}
