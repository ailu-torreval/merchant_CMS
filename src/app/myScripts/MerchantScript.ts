import { Injectable } from '@angular/core';
import { Merchant } from './Interfaces';

@Injectable()

export class MerchantScript {

  step: number = 3;

  merchant: Merchant = {
    dietaryOptionsIds: [], // list of dietryOptions ids
    date: "",
    name: "",
    bio: "",
    logo: "", // to be processed
    picture: "", // to be processed
    openingHoursMon: "", // format example: 11:30-16:30
    openingHoursTue: "",
    openingHoursWed: "",
    openingHoursThu: "",
    openingHoursFri: "",
    openingHoursSat: "",
    openingHoursSun: "",
    tags: "", // searchable tags, food they sell. Format: pizza,pasta,grill
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
    deliveryOptions: 0, // whether the merchant does deliver or not
    phone: "",
    feeRate: 0, // for future use as percentage
    priceRange: 0, // 0=cheap, 1=okay, 2=expensive
    mainCategoryIds: [], // reference to a list of MainCategories
    menuCategories: undefined, // reference to a list of MenuCategories
    // mainCategories: MainCategories, // reference to a list of MainCategories
    vat: "",
    isOpen: undefined,
    forcedClosed: false,
    email: "",
    distanceLimit: 0
  }
  constructor() { }


  changeToStep(step: number) {
    this.step = step;
  }

}