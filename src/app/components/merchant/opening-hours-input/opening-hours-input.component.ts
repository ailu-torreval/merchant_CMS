import { Component, Input, OnInit } from '@angular/core';
import { MerchantScript } from '../../../myScripts/MerchantScript';

@Component({
  selector: 'app-opening-hours-input',
  templateUrl: './opening-hours-input.component.html',
  styleUrls: ['./opening-hours-input.component.scss'],
})
export class OpeningHoursInputComponent implements OnInit {
  @Input() day: string | undefined;
  trimmedDay: string | undefined = '';
  openingString: string = '';

  closingTime: string | undefined = undefined;
  openingTime: string | undefined = undefined;
  isClosedForTheDay: boolean = false;

  timeOptions = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '24:00',
  ];

  constructor(private merchantScript: MerchantScript) {}

  ngOnInit() {
    this.trimmedDay = this.day?.substring(0, 3);
    this.openingString = 'openingHours' + this.trimmedDay;

    // for production only
    this.merchantScript.merchant.openingHoursFri = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursMon = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursTue = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursWed = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursThu = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursSat = "00:30 - 23:30";
    this.merchantScript.merchant.openingHoursSun = "00:30 - 23:30";

    // populate with data from script
    if (this.merchantScript.merchant[this.openingString] !== undefined) {
      if (this.merchantScript.merchant[this.openingString] == 'Closed') {
        this.isClosedForTheDay = true;
      } else {
        this.isClosedForTheDay = false;
        let times =
          this.merchantScript.merchant[this.openingString]?.split(' - ');
        this.openingTime = times?.[0];
        this.closingTime = times?.[1];
      }
    }
  }

  handleOpening(ev: any) {
    console.log(this.openingTime);
    if (this.closingTime != undefined && this.openingTime != undefined) {
      if (this.openingTime < this.closingTime) {
        this.merchantScript.merchant[
          this.openingString
        ] = `${this.openingTime} - ${this.closingTime}`; // `${this.openingTime} - ${this.closingTime}
      }
    }
  }
  handleClosing(ev: any) {
    console.log(this.closingTime);
    if (this.closingTime != undefined && this.openingTime != undefined) {
      if (this.openingTime < this.closingTime) {
        this.merchantScript.merchant[
          this.openingString
        ] = `${this.openingTime} - ${this.closingTime}`; // `${this.openingTime} - ${this.closingTime}
      }
      console.log(this.merchantScript.merchant);
    }
  }

  handleClosedToggle(ev: any) {
    console.log(this.isClosedForTheDay);
    if (this.isClosedForTheDay) {
      this.openingTime = undefined;
      this.closingTime = undefined;
      this.merchantScript.merchant[this.openingString] = 'Closed';
    } else {
      this.merchantScript.merchant[this.openingString] = '';
    }

    console.log(this.merchantScript.merchant);
  }
}
