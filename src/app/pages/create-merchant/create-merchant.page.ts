import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.page.html',
  styleUrls: ['./create-merchant.page.scss'],
})
export class CreateMerchantPage implements OnInit {

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {
  }

}
