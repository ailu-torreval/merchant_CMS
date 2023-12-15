import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantProfilePageRoutingModule } from './merchant-profile-routing.module';

import { MerchantProfilePage } from './merchant-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantProfilePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MerchantProfilePage]
})
export class MerchantProfilePageModule {}
