import { Injectable } from '@angular/core';
import { Product } from './Interfaces';

@Injectable()
export class ProductScript {
  errors: string[] = [
    'required',
    'minlength',
    'email',
    'pattern',
    'custom',
    'min',
    'max',
    'maxlength',
  ];

  selectedProduct: Product = {
    skId: 0,
    merchants_id: 0,
    menuCategories_id: 0, //reference to menu category
    dietaryOptionsIds: [],
    dietaryOptions_id: 1, // list of dietry options ids
    mainCategories_id: 1, //reference to main category
    similarProductId: 0,
    title: '',
    description: '',
    picture: '',
    price: 0,
    price2: 0,
    offerPrice: 0,
    offerDate: '',
    highlightTag: '', // offer, popular, special of the week etc.
    highlightColor: '', // background color of the highlight
    highLightIcon: '', // icon for highlight
    mainHighlightTag: '', // offer, popular, special of the week etc.
    mainHighlightColor: '', // background color of the highlight
    mainHighlightIcon: '', // icon for highlight
    showAsSuggestion: false,
    isOffer: false,
    lister: [], // comes from lister object
  };

  populateProductPartially(data: Partial<Product>) {
    for (const controlName of Object.keys(this.selectedProduct)) {
      if (data.hasOwnProperty(controlName)) {
        let value = data[controlName as keyof Product];
        if (typeof value === 'string') {
          value = value.toLowerCase();
        }
        (this.selectedProduct as any)[controlName] = value;
      }
    }
    console.log(this.selectedProduct);
  }

  reset() {
    this.selectedProduct = {
      skId: 0,
      merchants_id: 0,
      menuCategories_id: 0, //reference to menu category
      dietaryOptionsIds: [],
      dietaryOptions_id: 1, // list of dietry options ids
      mainCategories_id: 1, //reference to main category
      similarProductId: 0,
      title: '',
      description: '',
      picture: '',
      price: 0,
      price2: 0,
      offerPrice: 0,
      offerDate: '',
      highlightTag: '', // offer, popular, special of the week etc.
      highlightColor: '', // background color of the highlight
      highLightIcon: '', // icon for highlight
      mainHighlightTag: '', // offer, popular, special of the week etc.
      mainHighlightColor: '', // background color of the highlight
      mainHighlightIcon: '', // icon for highlight
      showAsSuggestion: false,
      isOffer: false,
      lister: [], // comes from lister object
    };
  }
}
