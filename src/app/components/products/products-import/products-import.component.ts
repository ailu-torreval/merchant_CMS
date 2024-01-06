import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SkScript } from 'src/app/myScripts/SkScript';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss'],
})
export class ProductsImportComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;

  constructor(public skScript: SkScript, private modalCtrl: ModalController) {}

  ngOnInit() {
    // only for production
    this.skScript.populateClient();
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
