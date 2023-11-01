import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step5',
  templateUrl: './merchant-step5.component.html',
  styleUrls: ['./merchant-step5.component.scss'],
})
export class MerchantStep5Component  implements OnInit {

  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {}

}
