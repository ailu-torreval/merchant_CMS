import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import categoriesJson from 'src/assets/dummy-data/categories.json';
import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';



@Component({
  selector: 'app-merchant-info-comfirm',
  templateUrl: './merchant-info-comfirm.component.html',
  styleUrls: ['./merchant-info-comfirm.component.scss'],
})
export class MerchantInfoComfirmComponent  implements OnInit {

  mainCategories: any[] = [];
  dietOptions: any[] = [];


  constructor(public merchantScript: MerchantScript) { }

  ngOnInit() {
    for(let catId of this.merchantScript.merchant.mainCategoryIds){
      this.mainCategories.push(categoriesJson.find(cat => cat.id == catId));
    }
    for(let optId of this.merchantScript.merchant.dietaryOptionsIds){
      this.dietOptions.push(dietOptJson.find(opt => opt.id == optId));
    }
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }

  confirmData() {
    console.log('confirmData');
  }

}
