import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BaseProvider } from '../base/base';
import { PlaceRegisterModel } from '../../models/placeRegister.model';


@Injectable()
export class PlaceProvider extends BaseProvider{

  constructor(public injector: Injector) {
    super(injector);
  }

  public register(placeData: PlaceRegisterModel){
    let params = new HttpParams();
    let aux={
      "placeId": 0,
      "namePlace": placeData.name,
      "capacity": placeData.capacity,
      "phone": "34991225506",
      "description": placeData.description,
      "locationX": placeData.location.lat,
      "locationY": placeData.location.lng,
      "userAdminId": this.storageHelper.getUser().userId,
      "typeOfPlaceId": placeData.type,
      "pictureList": [{
        "dataPicture" : placeData.picture
      }]
    }

    console.log(aux);
    console.log(this.storageHelper.getUser());

  }

}
