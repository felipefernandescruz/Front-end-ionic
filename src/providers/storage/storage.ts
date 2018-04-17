
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe} from '@angular/common';
import { RegisterModel } from '../../models/register.model';
import { PlaceRegisterModel } from '../../models/placeRegister.model';

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage, private datepipe:DatePipe) {}

  public insert(data : any){
    let key:any = 0;
    return this.save(key,data);
  }

  public update(key:string, user: RegisterModel){
    return this.save(key,user);
  }

  private save(key:string, user: RegisterModel){
    return this.storage.set(key,user);
  }

  public remove(key:string){
    return this.storage.remove(key);
  }

  public getAll(){
    let places: PlaceRegisterModel[] = [];
    this.storage.forEach((value: RegisterModel,key:string, intrationNumber:Number)=>{
      let place = new PlaceRegisterModel();
      place.key = key;
      place.admin = value;
      places.push(place);
    })
    .then(()=>{
      return Promise.resolve(places);
    })
    .catch((error)=>{
      return Promise.reject(error);
    });
  }

}
