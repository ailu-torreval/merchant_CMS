import { Component, OnInit } from '@angular/core';
import { MerchantScript } from 'src/app/myScripts/MerchantScript';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Merchant } from '../../myScripts/Interfaces';
import { Capacitor } from '@capacitor/core';
import { PhotoService } from 'src/app/services/photo.service';
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

  isMobile = Capacitor.getPlatform() !== 'web';

  step1Form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bio: new FormControl('', Validators.required),
    merchantType: new FormControl(1, Validators.required),
    logo: new FormControl(''),
    picture: new FormControl(''),
  });

  logo: any;
  picture: any;

  invalidLogo: boolean = false;
  invalidThumbnail: boolean = false;

  constructor(public merchantScript: MerchantScript, public photoService: PhotoService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {}

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
        this.invalidLogo = false;
        this.croppedLogo = null;
        this.openCropModal(this.rawLogo, isLogo);
      } else {
        this.rawImg = `data:image/jpeg;base64,${image.base64String}`;
        this.invalidThumbnail = false;
        this.croppedImg = null;
        this.openCropModal(this.rawImg, isLogo);
      }
    }
    
  }

  async openCropModal(image:string | undefined , isLogo: boolean) {
    console.log('open crop modal', isLogo , image);

    const modal = await this.modalCtrl.create({
      component: ImageCropPage,
      componentProps: {
        image: image,
        isLogo: isLogo
      }
    });
    await modal.present();



  }


  validateForm() {
    // check img and logo
    if (!this.invalidLogo && !this.invalidThumbnail) {
      //add logo and thumbnail manually
      console.log(this.step1Form.value);
      this.merchantScript.populateMerchantPartially(
        this.step1Form.value as Partial<Merchant>
      );

      this.merchantScript.changeToStep(2);
    }
  }
}
