import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMerchantPage } from './create-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMerchantPageRoutingModule {}
