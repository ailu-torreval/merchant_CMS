import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  activePage: 'import' | 'productsList';

  constructor(
    private http: Http,
    private merchantScript: MerchantScript,
    private router: Router
  ) {
    this.activePage = 'productsList';
  }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.merchantScript.mainCategories =
        navigation.extras.state['mainCategories'];
      this.merchantScript.dietaryOptions =
        navigation.extras.state['dietaryOptions'];
      this.merchantScript.merchant = navigation.extras.state['merchant'];
      this.merchantScript.indexedProducts =
        navigation.extras.state['indexedProducts'];
      this.merchantScript.merchantAlreadyIndexed =
        navigation.extras.state['merchantAlreadyIndexed'];
      this.merchantScript.menuCategoriesObject =
        navigation.extras.state['menuCategoriesObject'];
    }

    console.log(this.merchantScript.indexedProducts);
    console.log(this.merchantScript.merchant);

    // filter products between indexed and not indexed
    this.merchantScript.filterNotIndexedProducts();

  }

  changeSection(selectedSection: 'import' | 'productsList') {
    this.activePage = selectedSection;
  }
}
