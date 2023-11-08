import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step2',
  templateUrl: './merchant-step2.component.html',
  styleUrls: ['./merchant-step2.component.scss'],
})
export class MerchantStep2Component  implements OnInit {

  step2Form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(10)]),
    address1: new FormControl('', [Validators.required, Validators.minLength(5)]),
    address2: new FormControl(''),
    zip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(4), Validators.maxLength(6)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),

  })


  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  validateForm() {
    //check address
    //if address is unknown, open an popup window and verify the address
    // get coords from address
    // create an object with form data and coords
    // populate merchant object





    this.merchantScript.changeToStep(3);
  }

}
