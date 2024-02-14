import { Component, OnInit } from '@angular/core';
import { MerchantScript } from '../myScripts/MerchantScript';
import { SkScript } from '../myScripts/SkScript';
import { HttpClient } from '@angular/common/http';
import { SkResponseData, FAResponseData } from '../myScripts/Interfaces';
import { Router } from '@angular/router';
import { Http } from '../myScripts/Http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userIsLoggedIn: boolean = false;
  skClientID: string = '35823';

  constructor(
    public skScript: SkScript,
    private httpClient: HttpClient,
    private http: Http,
    private router: Router,
    public merchantScript: MerchantScript
  ) {}

  async ngOnInit() {
    // i tried locals storage but is not working
    // const storedUser = await this.storage.get('USERID');
    // console.log(storedUser)

    try {
      this.httpClient
        .request<SkResponseData>(
          'POST',
          'https://salgskernen.dk/sk_sync_foodapp',
          { body: { skClientID: this.skClientID } }
        )
        .subscribe((response) => {
          this.userIsLoggedIn = true;
          this.skScript.skData = response.success;
          console.log(response.success);
        });
    } catch (error) {
      this.http.showErrorAlert();
      console.log(error);
    }
    // i should check if the skUser is already indexed to foodApp db

    try {
      const FA_Data = (await this.http.request(
        // `merchantData/1244443`,
        `merchantData/${this.skClientID}`,
        'GET',
        null,
        { skMerchId: 'true' }
      )) as FAResponseData;

      this.merchantScript.dietaryOptions = FA_Data.dietaryOptions;
      this.merchantScript.mainCategories = FA_Data.mainCategories;
      console.log(this.merchantScript.dietaryOptions);
      console.log(this.merchantScript.mainCategories);
      if (FA_Data.merchant) {
        this.merchantScript.merchant = FA_Data.merchant;
        this.merchantScript.menuCategoriesObject = (FA_Data.menuCategories || []).sort((a, b) => a.sortOrder - b.sortOrder);
        // this.merchantScript.menuCategoriesObject = FA_Data.menuCategories || [];
        this.merchantScript.indexedProducts = FA_Data.products || [];
        this.merchantScript.merchantAlreadyIndexed = true;
      } else {
        console.log('not indexed');
      }
      console.log(FA_Data);
    } catch (error) {
      console.log(error);
      this.http.showErrorAlert();
    }
   }

  goToPage(endpoint: string) {
    if (this.merchantScript.merchantAlreadyIndexed) {
      this.router.navigate([endpoint], {
        state: {
          merchant: this.merchantScript.merchant,
          menuCategoriesObject: this.merchantScript.menuCategoriesObject,
          dietaryOptions: this.merchantScript.dietaryOptions,
          mainCategories: this.merchantScript.mainCategories,
          indexedProducts: this.merchantScript.indexedProducts,
          merchantAlreadyIndexed: this.merchantScript.merchantAlreadyIndexed
        },
      });
    } else {
      this.router.navigate([endpoint]);
    }
    console.log(this.merchantScript.dietaryOptions);
  }
}
