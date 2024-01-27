import { Component, OnInit } from '@angular/core';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  activePage: 'import' | 'productsList';

  constructor(private http:Http, private merchantScript: MerchantScript) { 
    this.activePage = 'import';
    // this.activePage = 'productsList';
  }

  async ngOnInit() {

    try {
      const FAMerchant: any = await this.http.request('merchantData/48');
      const dietOptions: any = await this.http.request('allDietaryOptions');
      console.log(FAMerchant);
      this.merchantScript.merchant = FAMerchant.merchants;
      this.merchantScript.menuCategoriesObject = FAMerchant.menuCategories;
      this.merchantScript.indexedProducts = FAMerchant.products;
      this.merchantScript.dietaryOptions = dietOptions;
      this.merchantScript.merchantAlreadyIndexed = true;
      this.merchantScript.filterNotIndexedProducts(); 
      console.log(this.merchantScript.merchant)
      console.log(this.merchantScript.menuCategoriesObject)
    } catch (error) {
      console.log(error);
    }
  }

  changeSection(selectedSection: 'import' | 'productsList') {
    this.activePage = selectedSection;
  }

}
