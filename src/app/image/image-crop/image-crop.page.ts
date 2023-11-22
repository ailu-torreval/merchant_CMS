import {Input, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.page.html',
  styleUrls: ['./image-crop.page.scss'],
})
export class ImageCropPage implements OnInit {

  @ViewChild('cropper') cropper: ImageCropperComponent | undefined;
  @Input() image: string = '';
  @Input() isLogo: boolean = false;
  croppedImage: any = '';
  transform: ImageTransform = {};
  isMobile = Capacitor.getPlatform() !== 'web';
 
  constructor(private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alert: AlertController) {}
 
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 85,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    const loading = await this.loadingCtrl.create();
    await loading.present();
 
    this.image = `data:image/jpeg;base64,${image.base64String}`;
    this.croppedImage = '';
  }

    // Called when cropper is ready
    imageLoaded() {
      this.loadingCtrl.dismiss();
    }
  
    // Called when we finished editing (because autoCrop is set to false)
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(this.croppedImage)
    }
  
    // We encountered a problem while loading the image
    async loadImageFailed() {

        const alert = await this.alert.create({
          message: 'Please try again.',
          header: 'Something went wrong',
          buttons: ['Accept'],
          htmlAttributes: {
            'aria-label': 'alert dialog',
          },
        });
        await alert.present();
      console.log('Image load failed!');
    }
  
    // Manually trigger the crop
    cropImage() {
      this.cropper?.crop();
      this.image = '';
      this.dismiss(this.croppedImage);
    }
  
    // Discard all changes
    discardChanges() {
      this.image = '';
      this.croppedImage = null;
    }
  
    // Edit the image
    rotate() {
      const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
  
      this.transform = {
        ...this.transform,
        rotate: newValue,
      };
    }
  
    flipHorizontal() {
      this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH,
      };
    }
  
    flipVertical() {
      this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV,
      };
    }

    dismiss(refresh?: any) {
      return this.modalCtrl.dismiss({
        refresh: refresh
      });
    }


  ngOnInit() {
  }
}



