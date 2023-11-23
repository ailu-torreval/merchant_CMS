import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Merchant } from '../../myScripts/Interfaces';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { LoadingController, ModalController } from '@ionic/angular';
import { ImageCropPage } from 'src/app/image/image-crop/image-crop.page';



@Component({
  selector: 'app-merchant-step1',
  templateUrl: './merchant-step1.component.html',
  styleUrls: ['./merchant-step1.component.scss'],
})
export class MerchantStep1Component implements OnInit {

  rawImg: string = '';
  rawLogo: string = '';
  croppedImg: any = '';
  croppedLogo: any = '';
  invalidImgs:boolean = false;

  isMobile = Capacitor.getPlatform() !== 'web';

  step1Form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bio: new FormControl('', Validators.required),
    merchantType: new FormControl(1, Validators.required)
  });

  logo: any;
  picture: any;

  isValidLogo: boolean = false;
  isValidThumbnail: boolean = false;

  constructor(public merchantScript: MerchantScript, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.merchantScript.merchant.name) {
      this.step1Form.get('name')?.setValue(this.merchantScript.merchant.name);
      this.step1Form.get('bio')?.setValue(this.merchantScript.merchant.bio);

      //this one doesnt work idk why
      this.step1Form
        .get('merchantType')
        ?.setValue(this.merchantScript.merchant.merchantType);
    }
  }

  manageMerchantType(ev: any) {
    console.log('merchant type: ', ev.detail.value);
    console.log(this.step1Form.get('merchantType')?.value);
  }

  selectLogo() {
    console.log('logo');
  }

  async selectImage(isLogo: boolean) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    const loading = await this.loadingCtrl.create();
    await loading.present();

    console.log(image);

    if(image) {
      if(isLogo) {
        this.rawLogo = `data:image/jpeg;base64,${image.base64String}`;
        this.croppedLogo = null;
        this.openCropModal(this.rawLogo, isLogo);
      } else {
        this.rawImg = `data:image/jpeg;base64,${image.base64String}`;
        this.croppedImg = null;
        this.openCropModal(this.rawImg, isLogo);
      }
    }
    
  }

  async openCropModal(image:string | undefined , isLogo: boolean) {
    const modal = await this.modalCtrl.create({
      component: ImageCropPage,
      componentProps: {
        image: image,
        isLogo: isLogo
      }
    });
    await modal.present();


    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data && "refresh" in data && data.refresh) {
      if(isLogo) {
        this.croppedLogo = data.refresh;
        this.merchantScript.merchant.logo = this.croppedLogo;
        this.isValidLogo = true;
      } else {
        this.croppedImg = data.refresh;
        console.log(this.croppedImg);
        
        this.merchantScript.merchant.picture = this.croppedImg;
        this.isValidThumbnail = true;
      }
    }
  }

  removeImg(isLogo: boolean) {
    if(isLogo) {
      this.merchantScript.merchant.logo = '';
      this.croppedLogo = null;
      this.isValidLogo = false;
    } else {
      this.merchantScript.merchant.picture = '';
      this.croppedImg = null;
      this.isValidThumbnail = false;
    }
  }


  validateForm() {
    // check img and logo
    if (this.isValidLogo && this.isValidThumbnail) {
      console.log(this.step1Form.value);
      this.merchantScript.populateMerchantPartially(
        this.step1Form.value as Partial<Merchant>
      );
      this.merchantScript.changeToStep(2);
    } else {
      this.invalidImgs = true;
    } 
  }
}
