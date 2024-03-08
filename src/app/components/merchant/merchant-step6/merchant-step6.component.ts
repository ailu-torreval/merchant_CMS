import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { Http } from 'src/app/myScripts/Http';
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

  constructor(
    public merchantScript: MerchantScript,
    private alert: AlertController,
    private http: Http
  ) {}

  ngOnInit() {
    if (this.merchantScript.menuCategoriesObject) {
      this.categories = this.merchantScript.menuCategoriesObject;
      this.categories.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    console.log(
      'FIRST, merchantScript',
      this.merchantScript.menuCategoriesObject
    );
  }

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

  deleteCat(catName: string, id: number | undefined) {
    if (this.merchantScript.merchantAlreadyIndexed && id !== undefined) {
      this.confirmDeletion(id);
    } else {
      const index = this.categories.findIndex((cat) => cat.name === catName);
      this.categories.splice(index, 1);
    }
  }

  async confirmDeletion(id: number) {
    const confirmation = await this.alert.create({
      header: 'Please Confirm',
      message:
        'Are you sure you want to delete this category? This is permanent.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {
            try {
              const deletedCat = (await this.http.request(
                `menucategory/${id}`,
                'DELETE'
              )) as { sucess: string };
              console.log(deletedCat);

              if (deletedCat.sucess === 'ok') {
                const index = this.categories.findIndex((cat) => cat.id === id);
                this.categories.splice(index, 1);
              }
            } catch (error) {
              this.http.showErrorAlert();
              console.log(error);
            }
          },
        },
      ],
    });

    await confirmation.present();
  }

  nextStep() {
    // add sort order to each category
    this.categories.forEach((category, index) => {
      category.sortOrder = index;
    });

    if (this.merchantScript.merchantAlreadyIndexed) {
      this.compareAndUpdateCategories();
      //needs to update the categories
    } else {
      this.merchantScript.menuCategoriesObject = this.categories;
      this.merchantScript.changeToStep(7);
      this.merchantScript.enableEdit = false;
    }
    console.log('finish', this.categories);
  }

  async compareAndUpdateCategories() {
    console.log('SECOND', this.categories);
    console.log(
      this.merchantScript.menuCategoriesObject.find((cat) => cat.id === 27)
    );
    // Create a map of categories by id for easy lookup
    const categoriesMap = new Map(
      this.categories.map((category) => [category.id, category])
    );
    const menuCategoriesMap = new Map(
      this.merchantScript.menuCategoriesObject.map((category) => [
        category.id,
        category,
      ])
    );

    console.log('categoriesMap:', Array.from(categoriesMap.entries()));

    const promises = [];

    // Iterate over this.categories
    for (const category of this.categories) {
      if (category.id) {
        // If the category exists in this.merchantScript.menuCategoriesObject, update it
        if (menuCategoriesMap.has(category.id)) {
          promises.push(this.manageCategoryRequests(category, 'PUT'));
        } else {
          // If the category doesn't exist in this.merchantScript.menuCategoriesObject, create it
          promises.push(this.manageCategoryRequests(category, 'POST'));
        }
      } else {
        // If the category doesn't have an id, it's a new category, so create it
        promises.push(this.manageCategoryRequests(category, 'POST'));
      }
    }

    try {
      // Wait for all promises to resolve
      await Promise.all(promises);
      // Show success alert
      this.showSuccessAlert('All categories have been updated successfully!');
      this.merchantScript.menuCategoriesObject = this.categories;
      this.merchantScript.changeToStep(7);
      this.merchantScript.enableEdit = false;
      console.log(this.merchantScript.menuCategoriesObject);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async manageCategoryRequests(
    category: MenuCategories,
    request: 'POST' | 'PUT' 
  ) {
    try {
      if (request == 'POST') {
        const createdCategory: any = await this.http.request(
          'createMenuCategory',
          'POST',
          category
        );
        const index = this.categories.findIndex(
          (cat) =>
            cat.name === createdCategory.name &&
            cat.sortOrder === createdCategory.sortOrder
        );
        if (index !== -1) {
          this.categories[index] = createdCategory;
        }
        console.log(' cat created', createdCategory.name, createdCategory);
      } else if (request == 'PUT') {
        const updatedCategory: any = await this.http.request(
          `menucategory/${category.id}`,
          'PUT',
          category
        );
      }
    } catch (error) {
      console.log(request, error);
    }
  }

  async showSuccessAlert(msg: string) {
    console.log('Success! All requests were made successfully.');
    const alert = await this.alert.create({
      header: msg,
      buttons: ['Accept'],
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
    });

    await alert.present();
  }
}
