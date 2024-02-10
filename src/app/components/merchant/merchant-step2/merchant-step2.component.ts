import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Merchant } from 'src/app/myScripts/Interfaces';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { LocationService } from 'src/app/services/location.service';

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


  constructor(public merchantScript: MerchantScript, private locationService: LocationService) { }

  ngOnInit() {
    if(this.merchantScript.merchant.email){
      console.log('populate form')
      this.step2Form.get('email')?.setValue(this.merchantScript.merchant.email);
      this.step2Form.get('phone')?.setValue(this.merchantScript.merchant.phone);
      this.step2Form.get('address1')?.setValue(this.merchantScript.merchant.address1);
      this.step2Form.get('address2')?.setValue(this.merchantScript.merchant.address2);
      this.step2Form.get('zip')?.setValue(this.merchantScript.merchant.zip);
      this.step2Form.get('city')?.setValue(this.merchantScript.merchant.city);
    }
  }

 async  validateForm() {
    //check address
    //if address is unknown, open an popup window and verify the address
    // get coords from address
    // create an object with form data and coords
    // populate merchant object


    try {      
         const results = await this.locationService.getCoords(this.step2Form.get('address1')?.value || '', this.step2Form.get('address2')?.value || '', this.step2Form.get('zip')?.value || '', this.step2Form.get('city')?.value || '');
         console.log(results);
         const locationData = {
           mapsLocationLat:  results.geometry.location.lat.toString(),
           mapsLocationLon:  results.geometry.location.lng.toString(),
           mapsToken: results.place_id
         }
     
         this.merchantScript.populateMerchantPartially(this.step2Form.value as Partial<Merchant>);
         this.merchantScript.populateMerchantPartially(locationData  as Partial<Merchant>);
     
         console.log(this.merchantScript.merchant);
         
         if(this.merchantScript.enableEdit) {
          this.merchantScript.merchantAlreadyIndexed && this.merchantScript.editExistentMerchant();
          this.merchantScript.enableEdit = false;
          this.merchantScript.changeToStep(7);
        } else {
          this.merchantScript.changeToStep(3);
        }

    }
    catch (err) {
      window.alert('Address not found, please verify it');
    }
  }

}
