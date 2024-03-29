import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SkScript } from 'src/app/myScripts/SkScript';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { ProductScript } from 'src/app/myScripts/ProductScript';
import { Product } from 'src/app/myScripts/Interfaces';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss'],
})
export class ProductsImportComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;

  constructor(public skScript: SkScript, private modalCtrl: ModalController, private http: Http, public merchantScript: MerchantScript, private prodScript: ProductScript) {}

 async  ngOnInit() {
    // only for production
    // this.skScript.populateClient();
    // this.merchantScript.filterNotIndexedProducts();



    // THIS SHOULDNT BE HERE - JUST FOR PRODUCTION
    // try {
    //   const FAMerchant: any = await this.http.request('merchantData/48');
    //   const dietOptions: any = await this.http.request('allDietaryOptions');
    //   console.log(FAMerchant);
    //   this.merchantScript.merchant = FAMerchant.merchants;
    //   this.merchantScript.menuCategoriesObject = FAMerchant.menuCategories;
    //   this.merchantScript.dietaryOptions = dietOptions;
    //   this.merchantScript.merchantAlreadyIndexed = true;
    //   console.log(this.merchantScript.merchant)
    //   console.log(this.merchantScript.menuCategoriesObject)
    // } catch (error) {
    //   console.log(error);
    // }

  //
  }

  get totalPages(): number {
    return Math.ceil(this.merchantScript.notIndexedProducts.length / this.pageSize);
  }



  async openProductModal(product: any) {
    console.log(product);
    //open prod modal
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps:{ product: product, isAlreadyIndexed: false, isNew:false },
    });

    modal.onDidDismiss().then(() => {
      this.prodScript.reset();
      console.log(this.prodScript.selectedProduct)
    });

    modal.present();

  }
}
