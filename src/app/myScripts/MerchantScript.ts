import { Injectable } from '@angular/core';

@Injectable()

export class MerchantScript {
    
    merchant = {
        dietaryOptionsIds: undefined, // list of dietryOptions ids
        date: undefined,
        name: undefined,
        bio: undefined,
        logo: undefined, // to be processed
        picture: undefined, // to be processed
        openingHoursMon: undefined, // format example: 11:30-16:30
        openingHoursTue: undefined,
        openingHoursWed: undefined,
        openingHoursThu: undefined,
        openingHoursFri: undefined,
        openingHoursSat: undefined,
        openingHoursSun: undefined,
        tags: undefined, // searchable tags, food they sell. Format: pizza,pasta,grill
        rating: undefined, // overall rating
        merchantType: undefined, //for determining if it's a restaurant, kiosk etc.
        defaultPickupTime: undefined, // minutes
        minOrderValue: undefined,
        address1: undefined,
        address2: undefined,
        zip: undefined,
        city: undefined,
        info: undefined, // for address
        mapsLocationLon: undefined, // google maps longitude
        mapsLocationLat: undefined, // google maps latitude
        mapsToken: undefined, // future use
        paymentPreferences: undefined, // future use
        highlightTag: undefined, // if we want to promote a seller
        highlightColor: undefined, // background color of the highlight
        highlightIcon: undefined, // icon for highlight
        putOnTop: undefined, // puts the seller on the slider, top of the page with the rest new ones
        deliveryPrice: undefined,
        deliveryOptions: undefined, // whether the merchant does deliver or not
        phone: undefined,
        feeRate: undefined, // for future use as percentage
        priceRange: undefined, // 0=cheap, 1=okay, 2=expensive
        mainCategoryIds: undefined, // reference to a list of MainCategories
        menuCategories: undefined, // reference to a list of MenuCategories
        // mainCategories: MainCategories, // reference to a list of MainCategories
        vat: undefined,
        isOpen: undefined,
        forcedClosed: undefined
    }
  constructor() { }

}