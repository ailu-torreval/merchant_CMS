import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step6',
  templateUrl: './merchant-step6.component.html',
  styleUrls: ['./merchant-step6.component.scss'],
})
export class MerchantStep6Component  implements OnInit {

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}


  validateForm() {
    console.log("finish");
    
  }

}
