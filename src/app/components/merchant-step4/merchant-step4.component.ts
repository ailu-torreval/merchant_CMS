import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step4',
  templateUrl: './merchant-step4.component.html',
  styleUrls: ['./merchant-step4.component.scss'],
})
export class MerchantStep4Component implements OnInit {
  pickupTime: number = 15;

  unvalidDeliveryOpt: boolean = false;
  unvalidPickupTime: boolean = false;

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() { }

  manageDeliveryOptions(ev: any) {
    console.log(ev);
  }

  validateForm() {
    this.merchantScript.changeToStep(5);
  }

}
