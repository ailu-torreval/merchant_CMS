import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step2',
  templateUrl: './merchant-step2.component.html',
  styleUrls: ['./merchant-step2.component.scss'],
})
export class MerchantStep2Component  implements OnInit {

  email: string | undefined;
  address1: string | undefined;
  address2: string | undefined;
  zip: string | undefined;
  city: string | undefined;
  googleMaps: string | undefined;
  phoneNr: string | undefined;



  unvalidEmail: boolean = false;
  unvalidAddr1: boolean = false;
  unvalidZip: boolean = false;
  unvalidCity: boolean = false;
  unvalidMaps: boolean = false;
  unvalidPhoneNr: boolean = false;



  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  validateForm() {
    this.merchantScript.changeToStep(3);
  }

}
