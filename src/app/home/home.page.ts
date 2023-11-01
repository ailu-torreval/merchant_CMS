import { Component } from '@angular/core';
import { MerchantScript } from '../myScripts/MerchantScript';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {







  constructor(public merchantScript: MerchantScript) {}


}
