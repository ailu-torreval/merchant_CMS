import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Merchant } from '../../myScripts/Interfaces';

@Component({
  selector: 'app-merchant-step1',
  templateUrl: './merchant-step1.component.html',
  styleUrls: ['./merchant-step1.component.scss'],
})
export class MerchantStep1Component implements OnInit {


  step1Form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bio: new FormControl('', Validators.required),
    merchantType: new FormControl(1, Validators.required),
  })

  invalidLogo: boolean = false;
  invalidThumbnail: boolean = false;


  constructor(public merchantScript: MerchantScript) {}

  ngOnInit() { 
    if(this.merchantScript.merchant.name) {
      this.step1Form.get('name')?.setValue(this.merchantScript.merchant.name);
      this.step1Form.get('bio')?.setValue(this.merchantScript.merchant.bio);

      //this one doesnt work idk why
     this.step1Form.get('merchantType')?.setValue(this.merchantScript.merchant.merchantType);
    }
  }

  manageMerchantType(ev: any) {
    console.log('merchant type: ', ev.detail.value);
    console.log( this.step1Form.get('merchantType')?.value);
  }

  validateForm() {

    // check img and logo 
    if (!this.invalidLogo && !this.invalidThumbnail) {
      //add logo and thumbnail manually
      console.log(this.step1Form.value);
      this.merchantScript.populateMerchantPartially(this.step1Form.value as Partial<Merchant>);

      this.merchantScript.changeToStep(2);
    }
  }

}
