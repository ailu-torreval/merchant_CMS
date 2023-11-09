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

  ngOnInit() {}

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
           mapsLocationLat:  results.geometry.location.lat,
           mapsLocationLon:  results.geometry.location.lng,
           mapsToken: results.place_id
         }
     
         this.merchantScript.populateMerchantPartially(this.step2Form.value as Partial<Merchant>);
         this.merchantScript.populateMerchantPartially(locationData  as Partial<Merchant>);
     
         this.merchantScript.changeToStep(3);
    }
    catch (err) {
      window.alert('Address not found, please verify it');
    }
  }

}
