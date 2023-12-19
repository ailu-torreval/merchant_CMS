import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { SkScript } from 'src/app/myScripts/SkScript';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.page.html',
  styleUrls: ['./merchant-profile.page.scss'],
})
export class MerchantProfilePage implements OnInit {

  isProfileCreated: boolean = false;
  isEditionEnabled: boolean = true;
  isFirstTime: boolean = false;

  constructor(public merchantScript: MerchantScript, public skScript: SkScript, private http: Http, private alertCtrl: AlertController) { }

  ngOnInit() {

    // check if the skUser has a merchant profile
    // populate the merchant script wiith data if there is
    // this.isProfileCreated = true;
    // this.merchantScript.step = 7
  



    // ONLY FOR PRODUCTION
    this.skScript.populateClient();

  }


  async importData() {
    console.log("import data");
    this.merchantScript.populateMerchantPartially(this.skScript.skData.client);
    this.merchantScript.merchant.vat = this.skScript.skData.client.vatNumber;
    this.merchantScript.merchant.address1 = this.skScript.skData.client.address.toLowerCase();
    this.merchantScript.populateCategories(this.skScript.skData.categories);

    const alert = await this.alertCtrl.create({
      header: 'We need more information',
      message: 'Please fill the form with the data needed.',
      buttons: ['Ok'],
    });

    await alert.present();

    this.isProfileCreated = true;
    this.merchantScript.step = 1;
    this.isFirstTime = true;
    console.log(this.merchantScript.merchant);
  }

}
