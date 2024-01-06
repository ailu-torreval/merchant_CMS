

export interface MainCategories {
    id: string,
    name: string,
    description: string,
    icon: string, // as in SVG
    checked?: boolean,
}

export interface DietaryOptions {
    id: string,
    name: string,
    description: string,
    icon: string, // as in SVG
    sortOrder: number, //rækkefølge or sorting
    checked?: boolean,
}


export interface Merchant {
    [key: string]: any;
    id?: string, // number
    dietaryOptionsIds: string[], // list of dietryOptions ids
    date: string,
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
    tags: string[], // searchable tags, food they sell. Format: pizza,pasta,grill
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
    mainCategoryIds: string[], // reference to a list of MainCategories
    menuCategories?: MenuCategories[] | undefined, // reference to a list of MenuCategories
    // mainCategories: MainCategories, // reference to a list of MainCategories
    vat: string,
    isOpen: boolean | undefined,
    forcedClosed: boolean,
    // skMerchID:string, // sk merchant id from sk table
}



export interface Ratings {
    id: number,
    merchantId: number,
    userId: number,
    comments: string, // for future use
    rating: number
}

export interface MenuCategories {
    id?: string,
    merchants_id?: string,
    name: string,
    description: string,
    sortOrder: number, //rækkefølge or sorting
    picture: string, // future use
}

export interface Product {
    id?: number,
    skId?: number,
    merchantId: number,
    menuCategoryId: number, //reference to main category
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
    lister?: Liste[] | undefined, // comes from lister object
}


export interface Liste {
    id?: number,
    productId?: number,
    title: string,
    options?: Option[], // reference to liste options, changed to JSON**
    order?: number, // change the order of the lister
    description: string,
    radioButton: boolean,
    total: number, // total price of all the options connected to this liste
}

export interface Option {
    id?: number,
    listeId?: number,
    name: string,
    description?: string,
    price?: number,
}

export interface Favorites {
    id: number,
    userId: number,
    merchantId: number,
}

export interface LocalFile {
    name: string,
    path: string;
    data: string;
}

export interface SKClientData {
    categories: any[];
    client: any;
    lister: any[];
    products: any[];
  }
  
export interface SkResponseData {
    success: SKClientData;
  }
