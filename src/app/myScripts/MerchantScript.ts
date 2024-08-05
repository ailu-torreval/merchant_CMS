import { Injectable } from '@angular/core';
import { DietaryOptions, MainCategories, MenuCategories, Merchant, Product } from './Interfaces';
import { SkScript } from './SkScript';
import { Http } from './Http';
import { AlertController } from '@ionic/angular';
import { SkProduct } from 'src/assets/Interfaces';

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
  merchantAlreadyIndexed: boolean = false;

  merchant: Merchant = {
    id: 0,
    skMerchID: '',
    dietaryOptionsIds: [], // list of dietryOptions ids
    date: '',
    name: '',
    bio: 'description here',
    logo: '', // to be processed -FAKE DATA FOR PRODUCTION REASONS
    picture: '', // to be processed - FAKE DATA FOR PRODUCTIONS REASONS
    openingHoursMon: '', // format example: 11:30-16:30
    openingHoursTue: '',
    openingHoursWed: '',
    openingHoursThu: '',
    openingHoursFri: '',
    openingHoursSat: '',
    openingHoursSun: '',
    tags: [], // searchable tags, food they sell. Format: pizza,pasta,grill
    rating: 0, // overall rating
    merchantType: 0, //for determining if it's a restaurant, kiosk etc.
    defaultPickupTime: 0, // minutes
    minOrderValue: 0,
    address1: '',
    address2: '',
    zip: '',
    city: '',
    info: '', // for address
    mapsLocationLon: '', // google maps longitude
    mapsLocationLat: '', // google maps latitude
    mapsToken: '', // future use
    paymentPreferences: '', // future use
    highlightTag: '', // if we want to promote a seller
    highlightColor: '', // background color of the highlight
    highlightIcon: '', // icon for highlight
    putOnTop: false, // puts the seller on the slider, top of the page with the rest new ones
    deliveryPrice: 0,
    deliveryOptions: 2, // whether the merchant does deliver or not
    phone: '',
    feeRate: 0, // for future use as percentage
    priceRange: 0, // 0=cheap, 1=okay, 2=expensive
    mainCategoriesIds: [], // reference to a list of MainCategories
    menuCategories: undefined, // reference to a list of MenuCategories
    // mainCategories: MainCategories, // reference to a list of MainCategories
    vat: '',
    forcedClosed: false,
    email: '',
    isActive: true,
    distanceLimit: [],
    bagFee: null
  };

  menuCategoriesObject: MenuCategories[] = [];

  dietaryOptions: DietaryOptions[] = [];

  mainCategories: MainCategories[] = [];

  indexedProducts: Product[] = [];

  notIndexedProducts: SkProduct[] = [];

  constructor(private skScript: SkScript, private http: Http, private alert: AlertController) {}

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
    for (let i = 0; i < data.length; i++) {
      const cat = data[i];
      const categoryToAdd: MenuCategories = {
        merchants_id: 0,
        name: cat.name.toLowerCase(),
        description: '',
        sortOrder: i,
        picture: '',
      };
      this.menuCategoriesObject.push(categoryToAdd);
    }
  }

  filterNotIndexedProducts() {
    this.notIndexedProducts = this.skScript.skData.products.filter(
      skProduct => !this.indexedProducts.find(
        indexedProduct => indexedProduct.skId === skProduct.id
      ));
      console.log("INDEXED:", this.indexedProducts)
      console.log("NOT INDEXED:", this.notIndexedProducts)
  }

  async uploadImage(imageObjForUpload: any): Promise<boolean> {
    try {
      console.log('from img try');
      const imageUploaded: any = await this.http.request(
        'uploadImage',
        'POST',
        imageObjForUpload
      );
      console.log(`${imageObjForUpload.name}Uploaded`, imageUploaded);
      return !!imageUploaded;
    } catch (error) {
      console.log('from catch');
      console.log('error', error);
      this.http.showErrorAlert();
      return false;
    }
  }

  async editExistentMerchant() {
    try {
      const editedMerchant = await this.http.request(`merchant/${this.merchant.id}`, 'PUT', this.merchant)  as { sucess: string };
      console.log(editedMerchant); 

      if (editedMerchant.sucess === 'ok') {
        console.log("from if statement")
        this.showSuccessAlert();
      }

    } catch(error) {
      console.log(error);
      this.http.showErrorAlert("We couldn't save the changes");
    }
  }

  async showSuccessAlert() {
    console.log("from alert")

    const alert = await this.alert.create({
      header: 'Great!',
      message: 'Changes has been saved.',
      buttons: ['Accept'],
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
    });
    await alert.present();

  }

  changeToStep(step: number) {
    this.step = step;
  }

  reset() {
    this.merchant = {
      id: 0,
      skMerchID: '',
      dietaryOptionsIds: [], // list of dietryOptions ids
      date: '',
      name: '',
      bio: 'description here',
      logo: '', // to be processed -FAKE DATA FOR PRODUCTION REASONS
      picture: '', // to be processed - FAKE DATA FOR PRODUCTIONS REASONS
      openingHoursMon: '', // format example: 11:30-16:30
      openingHoursTue: '',
      openingHoursWed: '',
      openingHoursThu: '',
      openingHoursFri: '',
      openingHoursSat: '',
      openingHoursSun: '',
      tags: [], // searchable tags, food they sell. Format: pizza,pasta,grill
      rating: 0, // overall rating
      merchantType: 0, //for determining if it's a restaurant, kiosk etc.
      defaultPickupTime: 0, // minutes
      minOrderValue: 0,
      address1: '',
      address2: '',
      zip: '',
      city: '',
      info: '', // for address
      mapsLocationLon: '', // google maps longitude
      mapsLocationLat: '', // google maps latitude
      mapsToken: '', // future use
      paymentPreferences: '', // future use
      highlightTag: '', // if we want to promote a seller
      highlightColor: '', // background color of the highlight
      highlightIcon: '', // icon for highlight
      putOnTop: false, // puts the seller on the slider, top of the page with the rest new ones
      deliveryPrice: 0,
      deliveryOptions: 2, // whether the merchant does deliver or not
      phone: '',
      feeRate: 0, // for future use as percentage
      priceRange: 0, // 0=cheap, 1=okay, 2=expensive
      mainCategoriesIds: [], // reference to a list of MainCategories
      menuCategories: undefined, // reference to a list of MenuCategories
      // mainCategories: MainCategories, // reference to a list of MainCategories
      vat: '',
      forcedClosed: false,
      email: '',
      isActive: true,
      distanceLimit: [],
      bagFee: null
    };

    this.menuCategoriesObject = [];

    this.dietaryOptions = [];
  
    this.mainCategories = [];
  
    this.indexedProducts = [];
  
    this.notIndexedProducts = [];
  }

}
