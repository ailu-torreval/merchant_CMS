import { Injectable } from '@angular/core';
import { Liste, Product } from './Interfaces';

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
    merchantId: 12,
    menuCategoryId: 5, //reference to menu category
    dietryOptionsIds: [], // list of dietry options ids
    mainCategoryId: 0, //reference to main category
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
    highlightIcon: '', // icon for highlight
    mainHighlightTag: '', // offer, popular, special of the week etc.
    mainHighlightColor: '', // background color of the highlight
    mainHighlightIcon: '', // icon for highlight
    showAsSuggestion: false,
    isOffer: false,
    lister: undefined, // comes from lister object
  };
}
