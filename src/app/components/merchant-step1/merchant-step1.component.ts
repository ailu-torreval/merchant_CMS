import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-step1',
  templateUrl: './merchant-step1.component.html',
  styleUrls: ['./merchant-step1.component.scss'],
})
export class MerchantStep1Component  implements OnInit {
  companyName: string | undefined;
  bio: string | undefined;



  unvalidName: boolean = false;
  unvalidBio: boolean = false;
  unvalidType: boolean = false;

  constructor() { }

  ngOnInit() {}

  manageMerchantType(ev: any) {
    console.log('merchant type: ', ev);
  }

}
