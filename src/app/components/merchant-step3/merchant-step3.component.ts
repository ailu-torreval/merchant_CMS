import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step3',
  templateUrl: './merchant-step3.component.html',
  styleUrls: ['./merchant-step3.component.scss'],
})
export class MerchantStep3Component  implements OnInit {

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  validateForm() {
    this.merchantScript.changeToStep(4);
  }

}
