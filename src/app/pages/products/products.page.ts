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
    this.activePage = 'import';
    // this.activePage = 'productsList';
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

    //   try {
    //     // const FAMerchant: any = await this.http.request('merchantData/48');
    //     // const dietOptions: any = await this.http.request('allDietaryOptions');
    //     // console.log(FAMerchant);
    //     // this.merchantScript.merchant = FAMerchant.merchants;
    //     // this.merchantScript.menuCategoriesObject = FAMerchant.menuCategories;
    //     // this.merchantScript.indexedProducts = FAMerchant.products;
    //     // this.merchantScript.dietaryOptions = dietOptions;
    //     // this.merchantScript.merchantAlreadyIndexed = true;
    //     // console.log(this.merchantScript.merchant)
    //     // console.log(this.merchantScript.menuCategoriesObject)
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  changeSection(selectedSection: 'import' | 'productsList') {
    this.activePage = selectedSection;
  }
}
