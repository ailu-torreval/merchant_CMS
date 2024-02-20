import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent  implements OnInit {
  page: number = 1;
  pageSize: number = 10;

  constructor(public merchantScript: MerchantScript, private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openProductModal(isNew: boolean, product?: any) {
    console.log(product);
    //open prod modal
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps:{ product: product, isAlreadyIndexed: isNew? false : true, isNew: isNew },
    });
    modal.present();

  }


}
