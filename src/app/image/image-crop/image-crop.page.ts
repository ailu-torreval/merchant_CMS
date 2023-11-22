import {Input, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
} from 'ngx-image-cropper';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.page.html',
  styleUrls: ['./image-crop.page.scss'],
})
export class ImageCropPage implements OnInit {
  @ViewChild('cropper') cropper!: ImageCropperComponent;
  @Input() image: string = '';
  @Input() isLogo: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  transform: ImageTransform = {};
  isMobile = Capacitor.getPlatform() !== 'web';
 
  constructor(private loadingCtrl: LoadingController, private modalCtrl: ModalController, private alert: AlertController) {}

    // Called when cropper is ready
    imageLoaded() {
      console.log('Image loaded');
      this.loadingCtrl.dismiss();
    }
  
    // Called after image is cropped
    imageCropped(event: ImageCroppedEvent) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.croppedImage = e.target?.result as string;
      };
      if (event.blob) {
        fileReader.readAsDataURL(event.blob);
      }
      console.log('Image cropped', this.croppedImage);
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
        console.log("FROM MODAL");
        this.dismiss(this.croppedImage);

    }
  
    // Discard all changes
    discardChanges() {
      this.image = '';
      this.croppedImage = null;
      this.dismiss();
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



