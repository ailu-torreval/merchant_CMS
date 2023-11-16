import { Component, OnInit } from '@angular/core';
import { DietaryOptions, MainCategories } from 'src/app/myScripts/Interfaces';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';
import categoriesJson from 'src/assets/dummy-data/categories.json';

@Component({
  selector: 'app-merchant-step5',
  templateUrl: './merchant-step5.component.html',
  styleUrls: ['./merchant-step5.component.scss'],
})
export class MerchantStep5Component implements OnInit {
  dietOptions: DietaryOptions[] = dietOptJson;
  mainCategories: MainCategories[] = categoriesJson;

  constructor(public merchantScript: MerchantScript) {}

  ngOnInit() {}

  nextStep() {
    // get checked categories and diet options and add them to the merchant object
    const checkedCatIds: string[] = this.mainCategories
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);
    this.merchantScript.merchant.mainCategoryIds = checkedCatIds;

    const checkedDietIds: string[] = this.dietOptions
      .filter((opt) => opt.checked)
      .map((cat) => cat.id);

    this.merchantScript.merchant.dietaryOptionsIds = checkedDietIds;
    console.log('merchant: ', this.merchantScript.merchant);
    this.merchantScript.changeToStep(6);
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }
}
