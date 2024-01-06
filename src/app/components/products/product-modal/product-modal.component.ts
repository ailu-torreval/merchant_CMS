import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { DietaryOptions, Liste, Option } from 'src/app/myScripts/Interfaces';
import { ProductScript } from 'src/app/myScripts/ProductScript';
import dietOptJson from 'src/assets/dummy-data/dietaryOptions.json';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { ImageCropPage } from 'src/app/image/image-crop/image-crop.page';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() product: any;
  rawImg: string = '';
  croppedImg: any = '';
  isOfferActivated: boolean = false;
  dietOptions: DietaryOptions[] = dietOptJson;
  optName: string = '';
  optPrice: number = 0;

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
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    offerPrice: new FormControl('', [Validators.min(0)]),
    isOfferActivated: new FormControl(false),
  });

  constructor(
    public prodScript: ProductScript,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.prodScript.selectedProduct.title = this.product.productName;
    this.prodScript.selectedProduct.price = this.product.price;
    this.prodScript.selectedProduct.skId = this.product.id;
    if (this.prodScript.selectedProduct.title) {
      this.productForm.controls.title.setValue(
        this.prodScript.selectedProduct.title
      );
      this.productForm.controls.description.setValue(
        this.prodScript.selectedProduct.description
      );
      this.productForm.controls.price.setValue(
        this.prodScript.selectedProduct.price.toString()
      );
      this.productForm.controls.offerPrice.setValue(
        this.prodScript.selectedProduct.offerPrice.toString()
      );
      this.productForm.controls.isOfferActivated.setValue(
        this.prodScript.selectedProduct.isOffer
      );
    }
    console.log(this.product, 'modal');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  validateForm() {
    console.log('validate form');
  }

  handleOfferToggle(ev: any) {
    console.log(ev);
  }

  createImgSrc(name: string) {
    return 'assets/icons/' + name;
  }

  addLister() {
    // validate form
    this.currentLister.options = this.currentOptions;
    this.lister.push({ ...this.currentLister });
    this.resetCurrentLister();
    this.currentOptions = [] as Option[];
  }

  addOption() {
    const opt = {
      name: this.optName,
      price: this.optPrice,
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

  async selectImage(isLogo: boolean) {
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
      this.prodScript.selectedProduct.picture = this.croppedImg;
    }
  }

  removeImg() {
    this.prodScript.selectedProduct.picture = '';
    this.croppedImg = null;
  }
}
