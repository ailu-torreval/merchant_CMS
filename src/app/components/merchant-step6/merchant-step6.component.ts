import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { MenuCategories } from 'src/app/myScripts/Interfaces';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';

@Component({
  selector: 'app-merchant-step6',
  templateUrl: './merchant-step6.component.html',
  styleUrls: ['./merchant-step6.component.scss'],
})
export class MerchantStep6Component implements OnInit {
  newCatForm = new FormGroup({
    newCatName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    newCatDesc: new FormControl(''),
  });

  categories: MenuCategories[] = [];

  constructor(public merchantScript: MerchantScript) {
    if (this.merchantScript.menuCategoriesObject) {
      this.categories = this.merchantScript.menuCategoriesObject;
      this.categories.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  }

  ngOnInit() {}

  addCategory() {
    const categoryToAdd: MenuCategories = {
      merchants_id: this.merchantScript.merchant.id,
      name: this.newCatForm.get('newCatName')?.value || '',
      description: this.newCatForm.get('newCatDesc')?.value || '',
      sortOrder: this.categories.length,
      picture: '',
    };
    this.categories.push(categoryToAdd);
    console.log(this.categories);
    this.newCatForm.reset();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    const itemMove = this.categories.splice(ev.detail.from, 1)[0];
    this.categories.splice(ev.detail.to, 0, itemMove);

    ev.detail.complete();
  }

  deleteCat(catName: string) {
    const index = this.categories.findIndex((cat) => cat.name === catName);
    this.categories.splice(index, 1);
  }

  nextStep() {
    // add sort order to each category
    this.categories.forEach((category, index) => {
      category.sortOrder = index;
    });

    this.merchantScript.menuCategoriesObject = this.categories;

    this.merchantScript.changeToStep(7);

    //merchant script shouldnt have menucategories obj inside, but only ids, so first post each menu category, then get the ids, then post merchant with ids

    // this.merchantScript.merchant.menuCategories = this.categories;
    console.log('finish', this.categories);
  }
}
