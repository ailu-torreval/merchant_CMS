import { Component, OnInit } from '@angular/core';
import { DietaryOptions, MainCategories } from 'src/app/myScripts/Interfaces';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
// import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';
// import categoriesJson from 'src/assets/dummy-data/categories.json';

@Component({
  selector: 'app-merchant-step5',
  templateUrl: './merchant-step5.component.html',
  styleUrls: ['./merchant-step5.component.scss'],
})
export class MerchantStep5Component implements OnInit {
  dietOptions: DietaryOptions[] = [];
  mainCategories: MainCategories[] = [];
  tags: string[] = [];
  newTag: string = '';

  constructor(public merchantScript: MerchantScript) {}

  ngOnInit() {
    this.dietOptions = this.merchantScript.dietaryOptions;
    this.mainCategories = this.merchantScript.mainCategories;
    console.log(this.dietOptions, this.mainCategories);
    console.log(this.merchantScript.dietaryOptions, this.merchantScript.mainCategories);

    // if the merchant object has main categories and dietary options, check them in the UI
    if (this.merchantScript.merchant.mainCategoriesIds.length > 0) {
      this.mainCategories.forEach((cat) => {
        if (this.merchantScript.merchant.mainCategoriesIds.includes(cat.id)) {
          cat.checked = true;
        }
      });
    }

    if (this.merchantScript.merchant.dietaryOptionsIds.length > 0) {
      this.dietOptions.forEach((opt) => {
        if (this.merchantScript.merchant.dietaryOptionsIds.includes(opt.id)) {
          opt.checked = true;
        }
      });
    }

  }

  addTag() {
    this.tags.push(this.newTag);
    this.newTag = '';
  }

  removeTag(tag: string) {
    const index = this.tags.findIndex((t) => t === tag);
    this.tags.splice(index, 1);
  }

  nextStep() {
    // get checked categories and diet options and add them to the merchant object
    const checkedCatIds: string[] = this.mainCategories
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);
    this.merchantScript.merchant.mainCategoriesIds = checkedCatIds;

    this.merchantScript.merchant.tags = this.tags;

    const checkedDietIds: number[] = this.dietOptions
      .filter((opt) => opt.checked)
      .map((cat) => cat.id);

    this.merchantScript.merchant.dietaryOptionsIds = checkedDietIds;
    console.log('merchant: ', this.merchantScript.merchant);
    if(this.merchantScript.enableEdit) {
      this.merchantScript.merchantAlreadyIndexed && this.merchantScript.editExistentMerchant();
      this.merchantScript.enableEdit = false;
      this.merchantScript.changeToStep(7);
    } else {
      this.merchantScript.changeToStep(6);
    }
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }
}
