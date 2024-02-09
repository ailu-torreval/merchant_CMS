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
  deliveryPriceObject: Array<Array<number>> = [];
  lastDistanceLimit: number = 0;

  step4Form = new FormGroup({
    deliveryOptions: new FormControl(2, Validators.required),
    defaultPickupTime: new FormControl(15, [
      Validators.required,
      Validators.min(0),
    ]),
    minOrderValue: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  distanceForm = new FormGroup({
    distanceLimit: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d+)?$/)]),
    deliveryPrice: new FormControl("", [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d+)?$/)]),
  })

  constructor(public merchantScript: MerchantScript) {}

  ngOnInit() {
    if (this.merchantScript.merchant.minOrderValue) {
      console.log(this.merchantScript.merchant.deliveryOptions);
      this.step4Form
        .get('deliveryOptions')
        ?.setValue(this.merchantScript.merchant.deliveryOptions);
      this.step4Form
        .get('defaultPickupTime')
        ?.setValue(this.merchantScript.merchant.defaultPickupTime);
      this.step4Form
        .get('minOrderValue')
        ?.setValue(this.merchantScript.merchant.minOrderValue);
    }
  }

  manageDeliveryOptions(ev: any) {
    console.log(ev.detail.value);
    console.log(this.step4Form.get('deliveryOptions')?.value);
  }

  handleDistance(ev: any) {
    console.log(ev.detail.value);
  }

  addDelivery() {
    console.log("DELIVWERY")
    const distanceLimit = Number(this.distanceForm.get('distanceLimit')?.value);
    const deliveryPrice = Number(this.distanceForm.get('deliveryPrice')?.value);

    this.deliveryPriceObject.push([distanceLimit, deliveryPrice]);
    this.lastDistanceLimit = distanceLimit + 1;

    this.distanceForm.get('distanceLimit')?.reset();
    this.distanceForm.get('deliveryPrice')?.reset();
  }

  deleteDeliveryRange(index: number) {
    this.deliveryPriceObject.splice(index, 1);
  }

  validateForm() {
    if(this.step4Form.get('deliveryOptions')?.value !== 0) {
      this.deliveryPriceObject.sort((a, b) => a[0] - b[0]);
      this.merchantScript.merchant.distanceLimit = this.deliveryPriceObject
    }
    this.merchantScript.populateMerchantPartially(
      this.step4Form.value as Partial<Merchant>
    );
    if (this.merchantScript.enableEdit) {
      this.merchantScript.enableEdit = false;
      this.merchantScript.changeToStep(7);
    } else {
      this.merchantScript.changeToStep(5);
    }
  }
}
