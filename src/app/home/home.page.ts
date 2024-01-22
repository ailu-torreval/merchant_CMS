import { Component, OnInit } from '@angular/core';
import { MerchantScript } from '../myScripts/MerchantScript';
import { SkScript } from '../myScripts/SkScript';
import { HttpClient } from '@angular/common/http';
import { SkResponseData } from '../myScripts/Interfaces';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Http } from '../myScripts/Http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userIsLoggedIn: boolean = false;
  data1 = { skClientID: '35823' };

  constructor(
    public skScript: SkScript,
    private httpClient: HttpClient,
    private http: Http,
    private router: Router,
    private merchantScript: MerchantScript
  ) {}

  async ngOnInit() {
    try {
      this.httpClient
        .request<SkResponseData>(
          'POST',
          'https://salgskernen.dk/sk_sync_foodapp',
          { body: this.data1 }
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

    // fake for production

    // try {
    //   const FAMerchant: any = await this.http.request('merchantData/48');
    //   console.log(FAMerchant);
    //   this.merchantScript.merchant = FAMerchant.merchants;
    //   this.merchantScript.menuCategoriesObject = FAMerchant.menuCategories;
    //   this.merchantScript.merchantAlreadyIndexed = true;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  goToPage(endpoint: string) {
    if (endpoint === 'merchant-profile') {
    } else {
    }
    this.router.navigate([endpoint]);
  }
}
