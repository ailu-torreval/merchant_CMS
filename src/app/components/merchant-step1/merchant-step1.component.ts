import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step1',
  templateUrl: './merchant-step1.component.html',
  styleUrls: ['./merchant-step1.component.scss'],
})
export class MerchantStep1Component  implements OnInit {
  companyName: string | undefined;
  bio: string | undefined;



  unvalidName: boolean = false;
  unvalidBio: boolean = false;
  unvalidType: boolean = false;
  unvalidLogo: boolean = false;
  unvalidThumbnail: boolean = false;


  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  manageMerchantType(ev: any) {
    console.log('merchant type: ', ev);
  }

  validateForm() {
    this.merchantScript.changeToStep(2);
  }

}
