import { RegisterModel } from './register.model';
export class PlaceRegisterModel {

    key?:string;
    admin?:RegisterModel;
    picture: any;
    name: string;
    description: string;
    capacity?: number;
    
    location?:{
        lat:number,
        lng:number
    };
    type: number;
    
    
   // permission: PlaceType;

    constructor() {
        this.name = '';
        this.picture='./assets/imgs/login-background.jpg';
        this.capacity = null;
        this.location = null;
        this.admin = null;
        this.type = null;
    //    this.location = null;
  //      this.permission = new PlaceType(0,"no Definition");
    }

    public newLocation(lat:number,lng:number){

        this.location = {lat:lat,lng:lng};
        console.log(this.location);
    }
}
