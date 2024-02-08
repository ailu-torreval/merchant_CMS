import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isFirstTime: boolean = true;

  constructor(public merchantScript: MerchantScript, public skScript: SkScript, private http: Http, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    console.log(this.merchantScript)

    // check if the skUser has a merchant profile
    // populate the merchant script wiith data if there is

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.merchantScript.mainCategories = navigation.extras.state['mainCategories'];
      this.merchantScript.dietaryOptions = navigation.extras.state['dietaryOptions'];
      this.merchantScript.merchant = navigation.extras.state['merchant'];
      this.merchantScript.merchantAlreadyIndexed = navigation.extras.state['merchantAlreadyIndexed'];
      this.merchantScript.menuCategoriesObject = navigation.extras.state['menuCategoriesObject'];
    }

    console.log(this.merchantScript.merchantAlreadyIndexed)
  
    if(this.merchantScript.merchantAlreadyIndexed) {
      console.log(2)
    this.isProfileCreated = true;
      this.merchantScript.changeToStep(7);
    }



    // ONLY FOR PRODUCTION
    // this.skScript.populateClient();
    // this.isProfileCreated = true;
    // this.merchantScript.step = 5;


  }


  async importData() {
    console.log("import data");
    this.merchantScript.populateMerchantPartially(this.skScript.skData.client);
    this.merchantScript.merchant.skMerchID = this.skScript.skData.client.id;
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
