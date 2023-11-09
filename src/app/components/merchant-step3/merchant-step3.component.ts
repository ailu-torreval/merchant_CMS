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
      this.merchantScript.changeToStep(4);
    }
    
    // if there are errors, display them
    // this.errorMsg = 'Please add a valid timeslot for Monday'

    

    // this.merchantScript.changeToStep(4);
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
