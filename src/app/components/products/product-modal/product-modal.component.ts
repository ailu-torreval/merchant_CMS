import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import {
  DietaryOptions,
  Liste,
  Option,
  Product,
} from 'src/app/myScripts/Interfaces';
import { ProductScript } from 'src/app/myScripts/ProductScript';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageCropPage } from 'src/app/image/image-crop/image-crop.page';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { Http } from 'src/app/myScripts/Http';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() product: any;
  @Input() isAlreadyIndexed!: boolean;
  @Input() isNew!: boolean;
  rawImg: string = '';
  croppedImg: any = null;
  // isOffer: boolean = false;
  // dietOptions: DietaryOptions[] = dietOptJson;
  selectedDiet: number[] = [];
  showListerForm: boolean = false;
  optName: string = '';
  optPrice: number = 0;
  showSuggestion: boolean = false;
  imgPath: string = '';

  currentLister: Liste = {
    title: '',
    description: '',
    radioButton: false,
    total: 0,
    options: [] as Option[],
  };

  currentOptions: Option[] = [];

  lister: Liste[] = [];

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.minLength(5)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    offerPrice: new FormControl(0, [Validators.min(0)]),
    isOffer: new FormControl(false),
    menuCategories_id: new FormControl(null, [Validators.required]),
  });

  constructor(
    public prodScript: ProductScript,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public merchantScript: MerchantScript,
    private http: Http,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.merchantScript.merchant.id !== undefined &&
    (this.prodScript.selectedProduct.merchants_id =
      this.merchantScript.merchant.id);
      
    if (this.isAlreadyIndexed && !this.isNew) {
      this.prodScript.selectedProduct = this.product;

      this.imgPath = `${this.http.mainUrl}/static/images/M/${this.merchantScript.merchant.skMerchID}/${this.product.id}.jpg`;

      if (this.product.lister.length > 0) {
        this.lister = this.product.lister;
      }
      this.showSuggestion = this.product.showAsSuggestion;

      // preselect the menu category
      // preselect the dietary options
      if (this.prodScript.selectedProduct) {
        if (this.prodScript.selectedProduct.dietaryOptionsIds) {
          this.selectedDiet = [
            ...this.prodScript.selectedProduct.dietaryOptionsIds,
          ];
        }
        if (this.prodScript.selectedProduct.menuCategories_id !== null) {
          let menuCategories_id_control =
            this.productForm.get('menuCategories_id');
          if (menuCategories_id_control) {
            menuCategories_id_control.setValue(
              this.prodScript.selectedProduct.menuCategories_id as any
            );
          }
        }
      }
    } else if (!this.isAlreadyIndexed && !this.isNew) {
      console.log('prod not indexed');
      this.prodScript.selectedProduct.title = this.product.productName;
      this.prodScript.selectedProduct.price = this.product.price;
      this.prodScript.selectedProduct.skId = this.product.id;
      this.prodScript.selectedProduct.merchants_id = this.merchantScript
        .merchant.id
        ? this.merchantScript.merchant.id
        : 0;
      if (this.product.lister) {
        this.lister = this.product.lister.map((item: any) => ({
          id: item.id,
          title: item.listeName,
          options: item.options.map((option: any) => ({
            id: option.id,
            name: option.name,
            price: option.price,
          })),
          description: '',
          radioButton: item.isMultiple === 1 ? false : true,
          total: 0,
          order: 0,
        }));
      }

      console.log(this.prodScript.selectedProduct);
    }
    if (this.prodScript.selectedProduct.title) {
      this.productForm.controls.title.setValue(
        this.prodScript.selectedProduct.title
      );
      this.productForm.controls.description.setValue(
        this.prodScript.selectedProduct.description
      );
      this.productForm.controls.price.setValue(
        this.prodScript.selectedProduct.price
      );
      this.productForm.controls.offerPrice.setValue(
        this.prodScript.selectedProduct.offerPrice
      );
      this.productForm.controls.isOffer.setValue(
        this.prodScript.selectedProduct.isOffer
      );
    }

    console.log(this.product, 'modal');
    console.log(this.croppedImg, this.productForm.valid);
  }

  // get isButtonDisabled() {
  //   if (this.isAlreadyIndexed) {
  //     return !this.productForm.valid;
  //   } else {
  //     return !this.productForm.valid;
  //   }
  // }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }

  handleOfferToggle(ev: any) {
    console.log(ev);
  }

  handleMenuCategorySelection(event: any) {
    this.prodScript.selectedProduct.menuCategories_id = event.detail.value;
  }

  updateSelectedDiet(option: DietaryOptions) {
    if (this.selectedDiet.includes(option.id)) {
      // If the option is already selected, remove its id from the selectedDiet array
      this.selectedDiet = this.selectedDiet.filter((id) => id !== option.id);
    } else {
      // If the option is not selected, add its id to the selectedDiet array
      this.selectedDiet.push(option.id);
      this.prodScript.selectedProduct.dietaryOptions_id = option.id;
    }
  }

  openListerForm() {
    this.showListerForm = true;
  }

  addLister() {
    // validate form
    this.currentLister.options = this.currentOptions;
    this.lister.push({ ...this.currentLister });
    this.resetCurrentLister();
    this.currentOptions = [] as Option[];
    this.showListerForm = false;
  }

  addOption() {
    const opt = {
      name: this.optName,
      price: this.optPrice,
      desc: '',
    };
    this.currentOptions.push(opt);
    console.log(opt);
    this.optName = '';
    this.optPrice = 0;
  }

  deleteOption(index: number) {
    this.currentOptions.splice(index, 1);
  }

  resetCurrentLister() {
    this.currentLister = {
      title: '',
      description: '',
      radioButton: false,
      total: 0,
      options: [],
    };
  }

  deleteListerForm(index: number) {
    this.lister.splice(index, 1);
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    const loading = await this.loadingCtrl.create();
    await loading.present();

    console.log(image);

    if (image) {
      this.rawImg = `data:image/jpeg;base64,${image.base64String}`;
      this.croppedImg = null;
      this.openCropModal(this.rawImg);
    }
  }

  async openCropModal(image: string | undefined) {
    const modal = await this.modalCtrl.create({
      component: ImageCropPage,
      componentProps: {
        image: image,
        isLogo: false,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data && 'refresh' in data && data.refresh) {
      this.croppedImg = data.refresh;
      console.log(this.croppedImg);
    }
  }

  removeImg() {
    this.croppedImg = null;
  }

  async validateForm() {
    try {
      this.prepareProductObject();

      if (this.isAlreadyIndexed) {
        await this.updateProduct();
      } else {
        await this.uploadProduct();
      }

      if (
        this.prodScript.selectedProduct.id !== 0 &&
        this.croppedImg !== null
      ) {
        await this.uploadImage();
      }

      this.showSuccessAlert(
        `Product ${this.isAlreadyIndexed ? 'updated' : 'created'}`
      );
    } catch (error) {
      this.http.showErrorAlert();
      console.log(error);
    }
    console.log('validate form', this.prodScript.selectedProduct);
  }

  async uploadProduct() {
    const createdProduct = await this.http.request(
      'createProduct',
      'POST',
      this.prodScript.selectedProduct
    );

    if (createdProduct) {
      console.log(createdProduct);
      this.prodScript.selectedProduct = createdProduct as Product;
      this.updateProductsList();
    } else {
      throw new Error('Product creation failed');
    }
  }

  async updateProduct() {
    const updatedProduct = (await this.http.request(
      `product/${this.prodScript.selectedProduct.id}`,
      'PUT',
      this.prodScript.selectedProduct
    )) as { sucess: string };

    if (updatedProduct.sucess === 'ok') {
      console.log('from if statement');
    } else {
      throw new Error('Update product failed');
    }
  }

  async uploadImage() {
    const imageObjectForUpload = {
      imageBase64: this.croppedImg.replace('data:image/png;base64,', ''),
      name: this.prodScript.selectedProduct.id?.toString(),
      type: 'PRODUCT_IMAGE',
      merchantID: this.merchantScript.merchant.skMerchID,
    };
    try {
      const imageUploaded: any = await this.http.request(
        'uploadImage',
        'POST',
        imageObjectForUpload
      );
      console.log(`${imageObjectForUpload.name}Uploaded`, imageUploaded);
    } catch (error) {
      console.log(error);
      this.http.showErrorAlert(
        'We couldnt upload the product image. Please try again.'
      );
    }
  }

  updateProductsList() {
    this.merchantScript.notIndexedProducts =
      this.merchantScript.notIndexedProducts.filter(
        (product) => product.id !== this.prodScript.selectedProduct.skId
      );
    this.merchantScript.indexedProducts.push(this.prodScript.selectedProduct);
    // }
  }

  prepareProductObject() {
    if (this.prodScript.selectedProduct.merchants_id !== 0) {
      this.prodScript.populateProductPartially(
        this.productForm.value as Partial<Product>
      );
      this.prodScript.selectedProduct.showAsSuggestion =
        this.lister.length === 0 ? this.showSuggestion : false;
      this.prodScript.selectedProduct.dietaryOptionsIds = this.selectedDiet;
      this.prodScript.selectedProduct.lister = this.lister;
    }
    console.log('OBJECT READY FOR UPLOAD', this.prodScript.selectedProduct);
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

    alert.onDidDismiss().then(() => {
      this.prodScript.selectedProduct = {} as Product;
      this.closeModal();
    });

    await alert.present();
  }
}
