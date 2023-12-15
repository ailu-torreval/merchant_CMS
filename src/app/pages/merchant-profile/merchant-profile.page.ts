import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { SkScript } from 'src/app/myScripts/SkScript';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.page.html',
  styleUrls: ['./merchant-profile.page.scss'],
})
export class MerchantProfilePage implements OnInit {

  isProfileCreated: boolean = false;


  constructor(public merchantScript: MerchantScript, public skScript: SkScript) { }

  ngOnInit() {

    // ONLY FOR PRODUCTION
    this.skScript.populateClient();

  }


  importData() {
    console.log("import data");
    this.merchantScript.populateMerchantPartially(this.skScript.skData.client);
    this.merchantScript.merchant.vat = this.skScript.skData.client.vatNumber;
    console.log(this.merchantScript.merchant);
    
    



  }

}
