import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Merchant } from 'src/app/myScripts/Interfaces';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step4',
  templateUrl: './merchant-step4.component.html',
  styleUrls: ['./merchant-step4.component.scss'],
})
export class MerchantStep4Component implements OnInit {

  step4Form = new FormGroup({
    deliveryOptions: new FormControl(2, Validators.required),
    defaultPickupTime: new FormControl(15, [Validators.required, Validators.min(0)]),
    minOrderValue : new FormControl(0, [Validators.required, Validators.min(0)]),
    distanceLimit : new FormControl(0, [Validators.required, Validators.min(1.5)]),
    deliveryPrice: new FormControl('', [Validators.required, Validators.min(0)])
  })


  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() { }

  manageDeliveryOptions(ev: any) {
    console.log(ev.detail.value);
    console.log(this.step4Form.get('deliveryOptions')?.value);
  }

  handleDistance(ev:any) {
    console.log(ev.detail.value);
    
  }

  validateForm() {
    this.merchantScript.populateMerchantPartially(this.step4Form.value as Partial<Merchant>);
    this.merchantScript.changeToStep(5);
  }

}
