import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, Platform } from '@ionic/angular';
import { LocalFile } from '../myScripts/Interfaces';

const IMAGE_DIR = 'stored-images';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  images: LocalFile[] = [];


  constructor(private platform: Platform, private loadingCtrl: LoadingController) {
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    console.log(image);

    if(image) {
      this.saveImage(image);
    }
    
  }


  async saveImage(photo:Photo) {
    const base64Data = await this.readAsBase64(photo);
    console.log(base64Data);
    

    const fileName = new Date().getTime() + 'jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    })

    console.log("saved file :" , savedFile);
    this.loadSavedImages();
  }



  async loadSavedImages() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading Images...'
    });
    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {
      console.log("RESULT", result);
    }, async err => {
      console.log(err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      });
    }).then(_ => { 
      this.loadingCtrl.dismiss();
    });
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path || ''
      });
  
      return file.data;
    }
    else { 
      // Fetch the photo, read as a blob, then convert to base64 format
      if (photo.webPath) {
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
      
        return await this.convertBlobToBase64(blob) as string;
      } else {
        throw new Error('photo.webPath is undefined');
      }    }
  }

  convertBlobToBase64 = (blob:Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob)
  })

}
