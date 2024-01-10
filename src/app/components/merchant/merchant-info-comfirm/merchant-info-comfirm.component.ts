import { Component, OnInit } from '@angular/core';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import categoriesJson from 'src/assets/dummy-data/categories.json';
import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';

@Component({
  selector: 'app-merchant-info-comfirm',
  templateUrl: './merchant-info-comfirm.component.html',
  styleUrls: ['./merchant-info-comfirm.component.scss'],
})
export class MerchantInfoComfirmComponent implements OnInit {
  mainCategories: any[] = [];
  dietOptions: any[] = [];
  isLoading: boolean = false;

  constructor(public merchantScript: MerchantScript, private http: Http) {}

  ngOnInit() {
    console.log('MERCHANT INFO', this.merchantScript.merchant);

    for (let catId of this.merchantScript.merchant.mainCategoriesIds) {
      this.mainCategories.push(categoriesJson.find((cat) => cat.id == catId));
    }
    for (let optId of this.merchantScript.merchant.dietaryOptionsIds) {
      this.dietOptions.push(dietOptJson.find((opt) => opt.id == optId));
    }
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }

  editStep(step: number) {
    this.merchantScript.enableEdit = true;
    this.merchantScript.changeToStep(step);
  }

  async confirmData() {
    this.isLoading = true;
    let { menuCategories, ...merchantWithoutMenuCategories } =
      this.merchantScript.merchant;
      try {
        console.log('from try')
        const createdMerchant: any = await this.http.request('createMerchant', 'POST', merchantWithoutMenuCategories);
        console.log('createdMerchant', createdMerchant);
        this.isLoading = false;
        if(createdMerchant) {
          this.merchantScript.merchant.id = createdMerchant.id;
        }
        
      } catch(error) {
        console.log('from catch')
        console.log('error', error);
        this.isLoading = false;
        this.http.showErrorAlert();
      }

    console.log('confirmData', merchantWithoutMenuCategories, menuCategories);
  }

}
