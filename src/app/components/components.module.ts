import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { MenuInfo1Component } from './menu-info1/menu-info1.component';
import { MenuInfo2Component } from './menu-info2/menu-info2.component';
import { MerchantStep1Component } from './merchant-step1/merchant-step1.component';
import { MerchantStep2Component } from './merchant-step2/merchant-step2.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';



export const components = [
    MerchantStep1Component,
    MerchantStep2Component,
    OpeningHoursComponent,
    DeliveryInfoComponent,
    MenuInfo1Component,
    MenuInfo2Component,
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: components
})
export class ComponentsModule { }
