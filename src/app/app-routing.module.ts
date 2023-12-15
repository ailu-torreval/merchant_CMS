import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'image-crop',
    loadChildren: () => import('./image/image-crop/image-crop.module').then( m => m.ImageCropPageModule)
  },
  {
    path: 'merchant-profile',
    loadChildren: () => import('./pages/merchant-profile/merchant-profile.module').then( m => m.MerchantProfilePageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'create-merchant',
    loadChildren: () => import('./pages/create-merchant/create-merchant.module').then( m => m.CreateMerchantPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
