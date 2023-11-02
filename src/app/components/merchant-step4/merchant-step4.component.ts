import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step4',
  templateUrl: './merchant-step4.component.html',
  styleUrls: ['./merchant-step4.component.scss'],
})
export class MerchantStep4Component implements OnInit {
  pickupTime: number = 15;
  minOrderValue: number = 0;
  deliveryPrice: number = 0;
  deliveryOptions:string = '';

  unvalidPickupTime: boolean = false;

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() { }

  manageDeliveryOptions(ev: any) {
    console.log(ev.detail.value);
    this.deliveryOptions = ev.detail.value
  }

  handleDistance(ev:any) {
    console.log(ev.detail.value);
    
  }

  validateForm() {
    this.merchantScript.changeToStep(5);
  }

}
