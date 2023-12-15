import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { LocationService } from '../services/location.service';
import { MerchantScript } from '../myScripts/MerchantScript';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  providers: [MerchantScript, LocationService],
  declarations: [HomePage]
})
export class HomePageModule { }
