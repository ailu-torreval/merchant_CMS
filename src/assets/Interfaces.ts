
export interface MainCategories {
    id: number,
    name: string,
    description: string,
    icon: string, // as in SVG
}

export interface DietaryOptions {
    id: number,
    name: string,
    description: string,
    icon: string, // as in SVG
    sortOrder: number, //rækkefølge or sorting
}


export interface Merchant {
    id: number,
    dietaryOptionsIds: object, // list of dietryOptions ids
    date: number,
    name: string,
    bio: string,
    logo: string, // to be processed
    picture: string, // to be processed
    openingHoursMon: string, // format example: 11:30-16:30
    openingHoursTue: string,
    openingHoursWed: string,
    openingHoursThu: string,
    openingHoursFri: string,
    openingHoursSat: string,
    openingHoursSun: string,
    tags: string, // searchable tags, food they sell. Format: pizza,pasta,grill
    rating: number, // overall rating
    merchantType: number, //for determining if it's a restaurant, kiosk etc.
    defaultPickupTime: number, // minutes
    minOrderValue: number,
    address1: string,
    address2: string,
    zip: string,
    city: string,
    info: string, // for address
    email: string,
    mapsLocationLon: string, // google maps longitude
    mapsLocationLat: string, // google maps latitude
    mapsToken: string, // future use
    paymentPreferences: string, // future use
    highlightTag: string, // if we want to promote a seller
    highlightColor: string, // background color of the highlight
    highlightIcon: string, // icon for highlight
    putOnTop: boolean, // puts the seller on the slider, top of the page with the rest new ones
    deliveryPrice: number,
    distanceLimit: number,
    deliveryOptions: number, // whether the merchant does deliver or not
    phone: string,
    feeRate: number, // for future use as percentage
    priceRange: number, // 0=cheap, 1=okay, 2=expensive
    mainCategoriesIds: MainCategories | string[], // reference to a list of MainCategories
    menuCategories: MenuCategories, // reference to a list of MenuCategories
    // mainCategories: MainCategories, // reference to a list of MainCategories
    vat: string,
    isOpen: boolean,
    forcedClosed: boolean,
}



export interface Ratings {
    id: number,
    merchantId: number,
    userId: number,
    comments: string, // for future use
    rating: number
}

export interface MenuCategories {
    id: number,
    merchantId: number,
    name: string,
    description: string,
    sortOrder: number, //rækkefølge or sorting
    picture: string, // future use
}

export interface Products {
    id: number,
    merchantId: number,
    menuCategoryId: number, //reference to menu category
    dietryOptionsIds: object, // list of dietry options ids
    mainCategoryId: number, //reference to main category
    similarProductId: number,
    title: string,
    description: string,
    picture: string,
    price: number,
    price2: number,
    offerPrice: number,
    offerDate: any,
    highlightTag: string, // offer, popular, special of the week etc.
    highlightColor: string, // background color of the highlight
    highlightIcon: string, // icon for highlight
    mainHighlightTag: string, // offer, popular, special of the week etc.
    mainHighlightColor: string, // background color of the highlight
    mainHighlightIcon: string, // icon for highlight
    showAsSuggestion: boolean,
    isOffer: boolean,
    lister: Lister, // comes from lister object
}

export interface SkProduct {
    accountNumber: string;
    askForBuyPrice: any;
    barred: number;
    costPrice: number;
    date: string;
    description: string;
    excludeFromRapports: any;
    extra: string;
    extra2: string;
    hideNumber: number;
    id: number;
    inStock: number;
    isDiverse: number;
    isNegative: any;
    isNew: any;
    isOffer: any;
    isOpenPlu: number;
    isScanOnly: number;
    kitchenOrder: any;
    kitchenPrinter: number;
    kitchenSameDashLine: any;
    listeIDs: any[];
    offerPrice: any;
    offerQuantity: any;
    otherCats: any;
    picUrl: string;
    price: number;
    productBarcode: string;
    productCategory: string;
    productColor: string;
    productName: string;
    productNumber: string;
    showNumPad: any;
    stockAlarmAmount: any;
    supply: any;
    taxLess: any;
    unit: string;
    weight: any;
  }


export interface Lister {
    id: number,
    productId: number,
    title: string,
    options: any, // reference to liste options, changed to JSON**
    order: number, // change the order of the lister
    description: string,
    radioButton: boolean,
    total: number, // total price of all the options connected to this liste
}

export interface Options {
    id: number,
    listeId: number,
    name: string,
    description: string,
    price: number,
}
