import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantStep1Component } from './merchant/merchant-step1/merchant-step1.component';
import { MerchantStep2Component } from './merchant/merchant-step2/merchant-step2.component';
import { MerchantStep4Component } from './merchant/merchant-step4/merchant-step4.component';
import { MerchantStep3Component } from './merchant/merchant-step3/merchant-step3.component';
import { MerchantStep5Component } from './merchant/merchant-step5/merchant-step5.component';
import { MerchantStep6Component } from './merchant/merchant-step6/merchant-step6.component';
import { MerchantInfoComfirmComponent } from './merchant/merchant-info-comfirm/merchant-info-comfirm.component';
import { OpeningHoursInputComponent } from './merchant/opening-hours-input/opening-hours-input.component';
import { MerchantScript } from '../myScripts/MerchantScript';
import { LocationService } from '../services/location.service';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { ProductsImportComponent } from './products/products-import/products-import.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';
import { ProductScript } from '../myScripts/ProductScript';
import { Http } from '../myScripts/Http';

export const components = [
  MerchantStep1Component,
  MerchantStep2Component,
  MerchantStep3Component,
  MerchantStep4Component,
  MerchantStep5Component,
  MerchantStep6Component,
  MerchantInfoComfirmComponent,
  OpeningHoursInputComponent,
  LoadingScreenComponent,
  ProductsImportComponent,
  ProductsListComponent,
  ProductModalComponent
];

@NgModule({
  declarations: [components],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  providers: [MerchantScript, LocationService, ProductScript, Http],
  exports: components,
})
export class ComponentsModule {}
