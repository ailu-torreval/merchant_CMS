import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantStep1Component } from './merchant-step1/merchant-step1.component';
import { MerchantStep2Component } from './merchant-step2/merchant-step2.component';
import { MerchantStep4Component } from './merchant-step4/merchant-step4.component';
import { MerchantStep3Component } from './merchant-step3/merchant-step3.component';
import { MerchantStep5Component } from './merchant-step5/merchant-step5.component';
import { MerchantStep6Component } from './merchant-step6/merchant-step6.component';
import { MerchantInfoComfirmComponent } from './merchant-info-comfirm/merchant-info-comfirm.component';
import { OpeningHoursInputComponent } from './opening-hours-input/opening-hours-input.component';



export const components = [
    MerchantStep1Component,
    MerchantStep2Component,
    MerchantStep3Component,
    MerchantStep4Component,
    MerchantStep5Component,
    MerchantStep6Component,
    MerchantInfoComfirmComponent,
    OpeningHoursInputComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class ComponentsModule { }
