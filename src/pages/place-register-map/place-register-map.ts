import { Component, Injector, ViewChild, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../base';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-place-register-map',
  templateUrl: 'place-register-map.html',
})
export class PlaceRegisterMapPage extends BasePage{
  @ViewChild('map') mapElement; 
  private map : any;
  private geocoder:any;
  private service = new google.maps.places.AutocompleteService();
  public autocompleteSearch: boolean = false;

  private userLocation: {lat: number , lng: number, mark:number} = {lat: 0 , lng: 0, mark:0};;

  private marker: any;

  private autocompleteItems;
  private autocomplete;

  constructor(protected injector: Injector, private geolocation: Geolocation, private zone: NgZone) {
    super(injector);
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    if(this.navParams.data.mark){
      this.initMap(this.navParams.data.lat,this.navParams.data.lng);    
    }else{
      this.initMap(this.navParams.data.lat,this.navParams.data.lng);
      this.initMark(this.navParams.data.lat,this.navParams.data.lng);
    }
  }

  private initMap(lat:number, lng:number){
    let latLng = new google.maps.LatLng(lat,lng);
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
    this.geocoder = new google.maps.Geocoder;
  }

  private initMark(lat:number, lng:number){
      let image="assets/imgs/logo-mark-resenha-p.png";
      let latLng = new google.maps.LatLng(lat,lng);
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: image,
      });

      this.findAddressLatLng(this.geocoder,this.map, lat+','+ lng);
  }

  private setUpMark(){
    if(this.map){
      if(this.marker){
        this.marker.setMap(null);
      }
      let image="assets/imgs/logo-mark-resenha-p.png";
        let latLng = this.map.getCenter();
        try{
          this.marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            icon: image,
          });
        }catch(error){
          this.alertHelper.errorAlert(error);
        }
        
      console.log(this.marker);
      this.userLocation.mark = 1;
      this.userLocation.lat = this.marker.getPosition().lat();
      this.userLocation.lng = this.marker.getPosition().lng();

      this.findAddressLatLng(this.geocoder,this.map, this.userLocation.lat+','+this.userLocation.lng);
    }else{
      this.alertHelper.errorAlert("Mapa não carregado','Favor, verifique sua conexão com a intert e espere o mapa carregar!");
    }
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
          if(results[0].address_components.length == 6){
            address={
                num: results[0].address_components[0].long_name,
                street: results[0].address_components[1].long_name,
                neighborhood: results[0].address_components[2].long_name ,
                city: results[0].address_components[3].long_name ,
                state: results[0].address_components[4].short_name,
                country: results[0].address_components[5].long_name,
              };
          }else{
            address={
              num: '',
              street: results[0].address_components[0].long_name,
              neighborhood: '',
              city: results[0].address_components[1].long_name ,
              state: results[0].address_components[2].short_name,
              country: results[0].address_components[3].long_name,
            };
          }
        }
         
         document.getElementById("placeRegisterMapAddress").innerHTML = "Endereço: "+address.street+', '+address.num+' - '+address.neighborhood;
         document.getElementById("placeRegisterMapCity").innerHTML = "Cidade: "+address.city +' - '+ address.state;
         document.getElementById("placeRegisterMapCountry").innerHTML = "País: "+address.country;
         
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });  
  }

  

  public onPlaceRegister(){
    if(this.marker){
      console.log("Mapa: " +this.userLocation);
      this.viewCtrl.dismiss(this.userLocation);
    }else{
      this.alertHelper.errorAlert("Favor marcar um local no mapa!");
    }
  }

  public onCancel(){
    this.userLocation.mark = 0;
    this.viewCtrl.dismiss(this.userLocation);
  }





 
  private chooseItem(item: any) {
    this.autocompleteSearch=false;
    this.geocodeAddress(item, this.map);
    this.autocomplete.query='';
    this.autocompleteItems=[];
  }
  
  private updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      this.autocompleteSearch=false;
      return;
    }else{
      this.autocompleteSearch=true;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'BR'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions){
          predictions.forEach(function (prediction) {       
              me.autocompleteItems.push(prediction.description);     
          });
        }
      });
    });
  }

  private geocodeAddress(address: string, geoMap:any ){

    this.geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        if(results[0]){
          geoMap.setCenter(results[0].geometry.location);
        }else{
          window.alert('Lugar não encontrado!');
        }
      //  document.getElementById("addressResenhaMap").innerHTML = "Endereço: "+ results[0].formatted_address;
      } else {
        window.alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  
}

}
