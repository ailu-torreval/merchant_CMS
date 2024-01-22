import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SkScript } from 'src/app/myScripts/SkScript';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss'],
})
export class ProductsImportComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;

  constructor(public skScript: SkScript, private modalCtrl: ModalController, private http: Http, private merchantScript: MerchantScript) {}

 async  ngOnInit() {
    // only for production
    this.skScript.populateClient();


    // THIS SHOULDNT BE HERE - JUST FOR PRODUCTION
    try {
      const FAMerchant: any = await this.http.request('merchantData/48');
      console.log(FAMerchant);
      this.merchantScript.merchant = FAMerchant.merchants;
      this.merchantScript.menuCategoriesObject = FAMerchant.menuCategories;
      this.merchantScript.merchantAlreadyIndexed = true;
      console.log(this.merchantScript.merchant)
      console.log(this.merchantScript.menuCategoriesObject)
    } catch (error) {
      console.log(error);
    }

  //
  }



  async openProductModal(product: any) {
    console.log(product);
    //open prod modal
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps: { product: product },
    });
    modal.present();

  }
}
