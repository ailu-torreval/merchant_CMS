import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMerchantPageRoutingModule } from './create-merchant-routing.module';

import { CreateMerchantPage } from './create-merchant.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateMerchantPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreateMerchantPage]
})
export class CreateMerchantPageModule {}
