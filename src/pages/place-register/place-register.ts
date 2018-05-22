import { Component, Injector, ViewChild } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { BasePage } from '../base';
import { PlaceRegisterModel } from '../../models/placeRegister.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { PlaceRegisterMapPage } from '../place-register-map/place-register-map';
import { PlaceProvider } from '../../providers/place/place';
import {} from '@types/googlemaps';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-place-register',
  templateUrl: 'place-register.html',
})
export class PlaceRegisterPage extends BasePage{
  @ViewChild('map') mapElement; 
  private map : any;
  private geocoder: any;

  public placeRegisterModel: PlaceRegisterModel;
  public placeRegisterForm: FormGroup;

  public isSubmitted: boolean;

  public isCNPJ : boolean;

  //MAP
  private userLocation:{lat:number, lng:number, mark:number } = {lat:0,lng : 0, mark : 1};
  public marker: any;
  constructor(protected injector : Injector, private geolocation: Geolocation, 
              private placeProvider : PlaceProvider, private platform: Platform,
              private camera : Camera) {
    
    super(injector);

    this.initFormValidators();

    this.placeRegisterModel = new PlaceRegisterModel();

  }

  ionViewDidLoad() {
    console.log(this.placeRegisterModel)
    if(this.placeRegisterModel.location == null){
      this.onSetGeolocation();
    }else{
      this.initMap(this.placeRegisterModel.location.lat,this.placeRegisterModel.location.lng);
    }
  }

  private initFormValidators(){
    this.placeRegisterForm = this.formBuilder.group({
      placeName: ['', this.validators.compose([this.validators.required])],
      description: ['', this.validators.compose([this.validators.required])],
      capacity: ['', this.validators.compose([this.validators.required])],
      type:['', this.validators.compose([this.validators.required])],
      //location: ['', this.validators.compose([this.validators.required])],
     // email:['',this.validators.compose([this.validators.email])]
    });
  }

  

  private async onSetGeolocation(){
    await this.platform.ready();
    this.geolocation.getCurrentPosition({enableHighAccuracy : true, timeout: 50000}).then((resp) => {
      this.userLocation = {lat:resp.coords.latitude, lng: resp.coords.longitude, mark:1};

      console.log(this.userLocation.lat,this.userLocation.lng);
//      this.loadingHelper.hideLoading();
      this.initMap(this.userLocation.lat,this.userLocation.lng);
     }).catch((error) => {

      this.alertHelper.errorAlert(error.message);
      // console.log('Error getting location', error);
     });

  }

  private initMap(lat: number,lng: number){
    let latLng = new google.maps.LatLng(lat, lng);
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
    this.geocoder = new google.maps.Geocoder;
  }

  public accessGallery(){  
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.placeRegisterModel.picture = 'data:image/jpeg;base64,'+imageData;
  //    this.alertHelper.okAlert("atualizou");
    }, (err)=> {
      console.log(err);
    });
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
    let chooseModal;
    if(this.map){
      if(this.placeRegisterModel.location){
        chooseModal = this.modalCtrl.create(PlaceRegisterMapPage,this.placeRegisterModel.location);
      }else{
        chooseModal = this.modalCtrl.create(PlaceRegisterMapPage,this.userLocation);
      }
      chooseModal.onDidDismiss( data => {
        console.log(data);
        if(data.mark!=0){
          this.placeRegisterModel.newLocation(data.lat, data.lng);
          this.setUpMarker();
        }
      });
      chooseModal.present();

    }else{
      this.alertHelper.errorAlert("Favor verifique sua conexao com a internet!");
      
    }
  }

  private setUpMarker(){
    if(this.marker){
      this.marker.setMap(null);
    }
    let image="assets/imgs/logo-mark-resenha-p.png";
    let latLng = new google.maps.LatLng(this.placeRegisterModel.location.lat,this.placeRegisterModel.location.lng);
    this.map.setCenter(latLng);
    this.marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      icon: image,
    });
    this.findAddressLatLng(this.geocoder,this.map, this.placeRegisterModel.location.lat+','+this.placeRegisterModel.location.lng);
  }

  private findAddressLatLng(geocoder, map ,latLng){
    let latlngStr = latLng.split(',', 2);
    let latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          
  
        let address;
          if(results[0].address_components.length > 7){
  
          address={
            num: results[0].address_components[0].long_name,
            street: results[0].address_components[1].long_name,
            neighborhood: results[0].address_components[2].long_name ,
            city: results[0].address_components[3].long_name ,
            state: results[0].address_components[5].short_name,
            country: results[0].address_components[6].long_name,
          };
        }else{
  
         address={
            num: results[0].address_components[0].long_name,
            street: results[0].address_components[1].long_name,
            neighborhood: results[0].address_components[2].long_name ,
            city: results[0].address_components[3].long_name ,
            state: results[0].address_components[4].short_name,
            country: results[0].address_components[5].long_name,
          };
        }
         
         document.getElementById("placeRegisterAddress").innerHTML = "Endereço: "+address.street+', '+address.num+' - '+address.neighborhood;
         document.getElementById("placeRegisterCity").innerHTML = "Cidade: "+address.city +' - '+ address.state;
         document.getElementById("placeRegisterCountry").innerHTML = "País: "+address.country;
         
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });  
  }

  public onSubmit(){
    
      this.isSubmitted = true;
      if(this.placeRegisterForm.valid){     
        if(this.placeRegisterModel.location){
          this.placeProvider.register(this.placeRegisterModel);
        }else{
          this.alertHelper.errorAlert("Favor adicionar o local");
        }
      } 
  }
}
