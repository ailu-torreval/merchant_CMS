import { Injectable } from '@angular/core';
import { MenuCategories, Merchant } from './Interfaces';

@Injectable()
export class MerchantScript {
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

  step: number = 1;
  enableEdit: boolean = false;

  merchant: Merchant = {
    skMerchID: "",
    dietaryOptionsIds: [], // list of dietryOptions ids
    date: "",
    name: "",
    bio: "description here",
    logo: "", // to be processed -FAKE DATA FOR PRODUCTION REASONS
    picture: "", // to be processed - FAKE DATA FOR PRODUCTIONS REASONS
    openingHoursMon: "", // format example: 11:30-16:30
    openingHoursTue: "",
    openingHoursWed: "",
    openingHoursThu: "",
    openingHoursFri: "",
    openingHoursSat: "",
    openingHoursSun: "",
    tags: [], // searchable tags, food they sell. Format: pizza,pasta,grill
    rating: 0, // overall rating
    merchantType: 0, //for determining if it's a restaurant, kiosk etc.
    defaultPickupTime: 0, // minutes
    minOrderValue: 0,
    address1: "",
    address2: "",
    zip: "",
    city: "",
    info: "", // for address
    mapsLocationLon: "", // google maps longitude
    mapsLocationLat: "", // google maps latitude
    mapsToken: "", // future use
    paymentPreferences: "", // future use
    highlightTag: "", // if we want to promote a seller
    highlightColor: "", // background color of the highlight
    highlightIcon: "", // icon for highlight
    putOnTop: false, // puts the seller on the slider, top of the page with the rest new ones
    deliveryPrice: 0,
    deliveryOptions: 2, // whether the merchant does deliver or not
    phone: "",
    feeRate: 0, // for future use as percentage
    priceRange: 0, // 0=cheap, 1=okay, 2=expensive
    mainCategoriesIds: [], // reference to a list of MainCategories
    menuCategories: undefined, // reference to a list of MenuCategories
    // mainCategories: MainCategories, // reference to a list of MainCategories
    vat: "",
    forcedClosed: false,
    email: "",
    isActive: true,
    distanceLimit: []
  }

  menuCategoriesObject: MenuCategories[] = [];

  constructor() {}

  populateMerchantPartially(data: Partial<Merchant>) {
    for (const controlName of Object.keys(this.merchant)) {
      if (data.hasOwnProperty(controlName)) {
        let value = data[controlName as keyof Merchant];
        if (typeof value === 'string') {
          value = value.toLowerCase();
        }
        (this.merchant as any)[controlName] = value;
      }
    }
    console.log(this.merchant);
  }

  populateCategories(data: any[]) {
    for(let i = 0; i < data.length; i++) {
      const cat = data[i];
      const categoryToAdd: MenuCategories = {
        merchants_id: '0',
        name: cat.name.toLowerCase(),
        description: '',
        sortOrder: i,
        picture: '',
      };
      this.menuCategoriesObject.push(categoryToAdd);
    }
  }

  changeToStep(step: number) {
    this.step = step;
  }
}
