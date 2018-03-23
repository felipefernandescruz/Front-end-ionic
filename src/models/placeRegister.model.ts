import { PlaceType } from '../enums/place-type.enum';

export class PlaceRegisterModel {

    admin?:number;
    picture: any;
    name: string;
    description: string;
    capacity: number;
    
    location:{
        lat:number,
        lng:number
    };
    type: number;
    
    
   // permission: PlaceType;

    constructor() {
        this.name = '';
        this.picture='./assets/imgs/login-background.jpg';
        this.capacity = 0;
        this.location = null;
        this.admin = null;
        this.type = null;
  //      this.permission = new PlaceType(0,"no Definition");
    }
}