import { Component, Injector, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../base';
import { PlaceRegisterModel } from '../../models/placeRegister.model';
import { FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceRegisterMapPage } from '../place-register-map/place-register-map';
import {} from '@types/googlemaps';

@IonicPage()
@Component({
  selector: 'page-place-register',
  templateUrl: 'place-register.html',
})
export class PlaceRegisterPage extends BasePage{
  @ViewChild('map') mapElement; 
  public map : any;

  public placeRegisterModel: PlaceRegisterModel;
  public placeRegisterForm: FormGroup;

  public isSubmitted: boolean;
  public isCNPJ : boolean;

  //MAP
  public userLocation:{lat:number, lng:number } = {lat:0,lng : 0};

  constructor(protected injector : Injector, private geolocation: Geolocation) {
    super(injector);

    this.initFormValidators();

    this.placeRegisterModel = new PlaceRegisterModel();

  }
  ionViewDidLoad() {
    this.onSetGeolocation();
  }

  private initFormValidators(){
    this.placeRegisterForm = this.formBuilder.group({
      placeName: ['', this.validators.compose([this.validators.required])],
      description: ['', this.validators.compose([this.validators.required])],
      location: ['', this.validators.compose([this.validators.required])],
      capacity: ['', this.validators.compose([this.validators.required])],
      type:['', this.validators.compose([this.validators.required])],
      email:['',this.validators.compose([this.validators.email])]
    });
  }

  private onSetGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        this.userLocation.lat=resp.coords.latitude;
      this.userLocation.lng=resp.coords.longitude;
    //  this.alertHelper.okAlert("lat",this.userLocation.lat)
      console.log(this.userLocation.lat);
      console.log(this.userLocation.lng);
      this.initMap();
     }).catch((error) => {
      this.alertHelper.errorAlert(error.message);
      // console.log('Error getting location', error);
     });

  }

  private initMap(){
    let latLng = new google.maps.LatLng(this.userLocation.lat,this.userLocation.lng);
    let mapOptions = {
      center:latLng,
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      zoomControl: false,
      scrollwheel:false,
      rotateControl:false,
      mapTypeControl:false,
      fullscreenControl:false,
      draggable:false,
      streetViewControl:false

    };
    

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  private onSelectChange(selectedValue: any) {
    if(selectedValue == "3"){
      this.isCNPJ = true;
    }else{
      this.isCNPJ = false;
    }
    console.log('Selected', selectedValue);
  }
  
  private onOpenPlacesMap(){
    let chooseModal = this.modalCtrl.create(PlaceRegisterMapPage,this.placeRegisterModel);
    chooseModal.dismiss( data => {
      if(data != null){
        console.log(data);
      }else{
        console.log(null);
      }
    });
    chooseModal.present();
  }

  

}
