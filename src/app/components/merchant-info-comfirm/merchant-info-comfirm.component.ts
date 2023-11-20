import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-info-comfirm',
  templateUrl: './merchant-info-comfirm.component.html',
  styleUrls: ['./merchant-info-comfirm.component.scss'],
})
export class MerchantInfoComfirmComponent  implements OnInit {

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  confirmData() {
    console.log('confirmData');
  }

}
