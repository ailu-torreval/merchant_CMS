import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step3',
  templateUrl: './merchant-step3.component.html',
  styleUrls: ['./merchant-step3.component.scss'],
})
export class MerchantStep3Component  implements OnInit {

  errorMsg:Array<string> = [];

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

  validateForm() {

    // check the merchant script looking for errors in opening hours
    this.validateDays();
    if(this.errorMsg.length === 0) {
      if(this.merchantScript.enableEdit) {
        this.merchantScript.merchantAlreadyIndexed && this.merchantScript.editExistentMerchant();
        this.merchantScript.enableEdit = false;
        this.merchantScript.changeToStep(7);
      } else {
        this.merchantScript.changeToStep(4);
      }
    }
  }

  validateDays() {
    this.errorMsg = [];

    for(let day of this.days) {
      const openingHoursStr = `openingHours${day.substring(0, 3)}`;
      if(this.merchantScript.merchant[openingHoursStr] == '') {
        console.log(day, 'is empty');
        this.errorMsg.push(day);
      }
    }
  }


}
