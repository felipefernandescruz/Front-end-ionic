import { Component, Injector,ViewChild} from '@angular/core';
import { IonicPage,Platform} from 'ionic-angular';
import { BasePage } from '../base';
import { PlaceRegisterPage } from '../place-register/place-register';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage extends BasePage {
  @ViewChild('map') mapElement; 
  public map:any;

  constructor(protected injector: Injector, private geolocation: Geolocation, private platform: Platform,) {
    super(injector);
  }

  ionViewDidLoad() {
    this.onWatchGeolocation();
    this.onSetGeolocation();
  }

  private async onSetGeolocation(){
    await this.platform.ready();
    this.geolocation.getCurrentPosition({enableHighAccuracy : true, timeout: 50000}).then((resp) => {

      this.initMap(resp.coords.latitude,resp.coords.longitude);
     }).catch((error) => {

      this.alertHelper.errorAlert(error.message);
      // console.log('Error getting location', error);
     });

  }

  private async onWatchGeolocation(){
    await this.platform.ready();
    let watch = this.geolocation.watchPosition({enableHighAccuracy : true, timeout: 50000});
    watch.subscribe((data) => {
      console.log(watch);
      console.log(data.coords);
      let latLng = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      this.map.setCenter(latLng);
    });
  }

  private initMap(lat: number,lng: number){
    let latLng = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center:latLng,
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      streetViewControl:false,
      zoomControl:false,
      fullscreenControl:false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


  public onPlaceRegister(){
    this.navCtrl.push(PlaceRegisterPage);
  }

}
