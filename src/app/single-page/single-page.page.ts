import { Component, OnInit } from '@angular/core';
import { NewsapiService } from '../newsapi.service';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.page.html',
  styleUrls: ['./single-page.page.scss'],
})
export class SinglePagePage implements OnInit {
  article: any;
  lat: any;
  lon: any;
  imgURL;
  constructor(
    private newsApi: NewsapiService,
    private al: AlertController,
    private gl: Geolocation,
    private camera: Camera
  ) {}

  ngOnInit() {
    this.article = this.newsApi.currentArticle;
    console.group('SinglePage', this.newsApi.currentArticle);
  }
  //Alert Controller
  async showAlert() {
    await this.al
      .create({
        header: 'Enter Promo',
        subHeader: 'promoCode',
        message: 'Enter Promocode if any',
        inputs: [
          {
            type: 'text',
            name: 'promo',
            placeholder: 'promocode',
          },
        ],
        buttons: [
          {
            text: 'Apply',
            handler: (res) => {
              console.log(res.promo);
            },
          },
          {
            text: 'cancel',
          },
        ],
      })
      .then((res) => res.present());
  }

  youArehere() {
    this.gl
      .getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: true,
      })
      .then((res) => {
        this.lat = res.coords.latitude;
        this.lon = res.coords.longitude;
      });
  }
  //Camera
  getCamera() {
    this.camera
      .getPicture(
        {
          sourceType:this.camera.PictureSourceType.CAMERA,
          destinationType: this.camera.DestinationType.DATA_URL
        }
      )
      .then((res) => {
        this.imgURL='data:image/jpeg;base64,' +res;
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }
  getGallery() {
    this.camera
      .getPicture(
        {
          sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI
        }
      )
      .then((res) => {
        this.imgURL='data:image/jpeg:base64,' +res;
      })
      .catch((e) => {
        console.log('Error', e);
      });
  }
}
