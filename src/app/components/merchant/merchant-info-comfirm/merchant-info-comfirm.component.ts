import { Component, OnInit } from '@angular/core';
import { Http } from 'src/app/myScripts/Http';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { MerchantProfilePage } from 'src/app/pages/merchant-profile/merchant-profile.page';
import categoriesJson from 'src/assets/dummy-data/categories.json';
import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';

@Component({
  selector: 'app-merchant-info-comfirm',
  templateUrl: './merchant-info-comfirm.component.html',
  styleUrls: ['./merchant-info-comfirm.component.scss'],
})
export class MerchantInfoComfirmComponent implements OnInit {
  mainCategories: any[] = [];
  dietOptions: any[] = [];
  isLoading: boolean = false;
  imgPath: string = '';
  loadingStatus: number = 0; // status index: 0=not-loading, 1=creating merchant 2=creating menu categories 3=uploading images
  STATUS_CREATING_MERCHANT = 1;
  STATUS_ADDING_CATEGORIES = 2;
  STATUS_UPLOADING_IMAGES = 3;
  STATUS_DONE = 4;

  constructor(public merchantScript: MerchantScript, private http: Http) {}

  ngOnInit() {
    console.log('MERCHANT INFO', this.merchantScript.merchant);

    this.imgPath = `${this.http.mainUrl}/static/images/M/`;

    console.log(this.imgPath + this.merchantScript.merchant.skMerchID + "/logo.jpg", this.merchantScript.merchantAlreadyIndexed)


    for (let catId of this.merchantScript.merchant.mainCategoriesIds) {
      this.mainCategories.push(categoriesJson.find((cat) => cat.id == catId));
    }
    for (let optId of this.merchantScript.merchant.dietaryOptionsIds) {
      this.dietOptions.push(dietOptJson.find((opt) => opt.id == optId));
    }
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }

  editStep(step: number) {
    this.merchantScript.enableEdit = true;
    this.merchantScript.changeToStep(step);
  }

  async confirmData() {
    this.isLoading = true;
    // save svg strings
    const logo = this.merchantScript.merchant.logo.replace(
      'data:image/png;base64,',
      ''
    );
    const cover = this.merchantScript.merchant.picture.replace(
      'data:image/png;base64,',
      ''
    );
    // delete img strings
    this.merchantScript.merchant.picture = ' ';
    this.merchantScript.merchant.logo = ' ';

    try {
      this.loadingStatus = this.STATUS_CREATING_MERCHANT;
      await this.createMerchant();

      this.loadingStatus = this.STATUS_ADDING_CATEGORIES;
      await this.addMenuCategories();

      this.loadingStatus = this.STATUS_UPLOADING_IMAGES;
      await this.addImages(logo, cover);

      this.loadingStatus = this.STATUS_DONE;
      this.merchantScript.showSuccessAlert();
    } catch (error) {
      console.log('error', error);
      this.loadingStatus = 0;
      this.http.showErrorAlert();
    } finally {
      this.isLoading = false;
    }

    console.log('confirmData', this.merchantScript.menuCategoriesObject);
    console.log('confirmData', this.merchantScript.merchant);
  }


  async createMerchant() {
    try {
      console.log('from merchant try');
      const createdMerchant: any = await this.http.request(
        'createMerchant',
        'POST',
        this.merchantScript.merchant
      );
      console.log('createdMerchant', createdMerchant);
      if (createdMerchant) {
        this.merchantScript.merchant.id = createdMerchant.id;
        this.merchantScript.merchantAlreadyIndexed = true;
        this.loadingStatus = 2;
      }
    } catch (error) {
      console.log('from catch');
      console.log('error', error);
      this.loadingStatus = 0;
      this.http.showErrorAlert();
    }
  }

  async addMenuCategories() {
    try {
      // Create an array of promises
      const promises = this.merchantScript.menuCategoriesObject.map(
        (category) => {
          category.merchants_id = this.merchantScript.merchant.id;
          this.http.request('createMenuCategory', 'POST', category)
        }
      );

      // Wait for all promises to resolve
      const createdCategories = await Promise.all(promises);

      if (createdCategories) {
        this.loadingStatus = 3;
      }
      console.log('createdCategories', createdCategories);
    } catch (error) {
      console.log('from category error catch');
      console.log('error', error);
      this.loadingStatus = 0;
      this.http.showErrorAlert();
    }
  }

  async addImages(logo: string, cover: string) {
    const coverObjForUpload = {
      imageBase64: cover,
      name: 'cover',
      type: 'MERCHANT_IMAGE',
      merchantID: this.merchantScript.merchant.skMerchID,
    };
    const logoObjForUpload = {
      imageBase64: logo,
      name: 'logo',
      type: 'MERCHANT_LOGO',
      merchantID: this.merchantScript.merchant.skMerchID,
    };

    console.log(logoObjForUpload);
    console.log(coverObjForUpload);

    // uploadImages
    try {
      const [logoUploaded, coverUploaded] = await Promise.all([
        this.merchantScript.uploadImage(logoObjForUpload),
        this.merchantScript.uploadImage(coverObjForUpload),
      ]);

      if (logoUploaded && coverUploaded) {
        this.loadingStatus = 4;
      }
    } catch (error) {
      console.log('from catch');
      console.log('error', error);
      this.loadingStatus = 0;
      this.http.showErrorAlert();
    }
  }

}
